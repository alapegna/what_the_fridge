<?php

	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "sample";
	$lastName = "sample";

	$conn = new mysqli("grouponedb.co9dcxo307nm.us-east-2.rds.amazonaws.com", "groupOneDB", "groupone", "groupOneDB");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$login = mysqli_real_escape_string($conn,$inData["login"]);
		$password = mysqli_real_escape_string($conn,$inData["password"]);

		$sql = "SELECT User_ID,FirstName,LastName FROM Users where UserName='" . $login . "' and Pass='" . $password . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$firstName = $row["FirstName"];
			$lastName = $row["LastName"];
			$id = $row["User_ID"];
			returnWithInfo($firstName, $lastName, $id );
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}
	
	
	
	

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
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>