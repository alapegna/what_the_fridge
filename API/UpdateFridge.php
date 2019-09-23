<?php
	$inData = getRequestInfo();
	
	$conn = new mysqli("grouponedb.co9dcxo307nm.us-east-2.rds.amazonaws.com", "groupOneDB", "groupone", "groupOneDB");
	
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$userID = mysqli_real_escape_string($conn,$inData["UserID"]);
		$proteins = mysqli_real_escape_string($conn,$inData["Proteins"]);
		$vegetables = mysqli_real_escape_string($conn,$inData["Vegetables"]);
		$dairy = mysqli_real_escape_string($conn,$inData["Dairy"]);
		$carb = mysqli_real_escape_string($conn,$inData["Carbs"]);
		$spices = mysqli_real_escape_string($conn,$inData["Spices"]);

		$sql = "UPDATE Fridge 
		SET Proteins = '".$proteins."', Vegetables = '".$vegetables."', Dairy = '".$dairy."', Carb = '".$carb."', Spices = '".$spices."'
		WHERE Fridge_ID = '".$userID."'";
   
		$result = $conn->query($sql);
  
		if ($result != TRUE)
  		{
	 		userError( $conn->error );
	    }
	  	else
		{
			userError("");
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function userError($err)
	{
		$myJSON = json_encode($err);
		echo $myJSON;

	}
?>