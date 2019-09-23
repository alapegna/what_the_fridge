<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$userId = "";

	$conn = new mysqli("grouponedb.co9dcxo307nm.us-east-2.rds.amazonaws.com", "groupOneDB", "groupone", "groupOneDB");

	if ($conn->connect_error) 
	{
		userError( $conn->connect_error );
	} 
	else
	{
		$userId = $inData["UserID"];

		$sql = "SELECT Proteins,Vegetables,Carb,Dairy,Spices FROM Fridge WHERE User_ID = '" . $userId . "'";		
		
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
				$searchResults .= '"' . $row["Proteins"] . '", "' .$row["Vegetables"]. '", "' .$row["Carb"]. '", "' .$row["Dairy"]. '", "' .$row["Spices"]. '"';
			}
		}

		else
		{
			userError("No fridge found");
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