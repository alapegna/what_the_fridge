<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$name = "";

	$conn = new mysqli("grouponedb.co9dcxo307nm.us-east-2.rds.amazonaws.com", "groupOneDB", "groupone", "groupOneDB");

	if ($conn->connect_error) 
	{
		userError( $conn->connect_error );
	} 
	else
	{
		$name = $inData["name"];

		$sql = "SELECT * FROM Recipes WHERE Recipe_Name = '" . $name . "'";		
		
		//echo $sql;
		
		// Run SQL String
		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= '"' . $row["Recipe_Name"] . '", "'. $row["Rating"] . '", "'. $row["Cuisine"] . '", "'. $row["Ingredient_List"] . '", "' .$row["Steps"].'", "' .$row["Image"]. '"';
			}
		}

		else
		{
			userError("Error retrieving recipe contents");
		}
		$conn->close();
	}

	returnWithInfo( $searchResults );

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

	function userError($err)
	{
		$myJSON = json_encode($err);
		echo $myJSON;
	}
	
?>