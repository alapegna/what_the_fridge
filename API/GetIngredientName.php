<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("grouponedb.co9dcxo307nm.us-east-2.rds.amazonaws.com", "groupOneDB", "groupone", "groupOneDB");

	if ($conn->connect_error) 
	{
		userError( $conn->connect_error );
	} 
	else
	{
		$sql = "select Ingredient_Name from Ingredients where Ingredient_ID like '" . $inData["Ingredient_ID"] . "'";
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
				$searchResults .= '"' .$row["Ingredient_Name"]. '"';
			}
		}
		else
		{
			userError("No ingredient name found.");
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
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
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