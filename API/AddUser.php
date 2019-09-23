<?php
	$inData = getRequestInfo();
	
	$conn = new mysqli("grouponedb.co9dcxo307nm.us-east-2.rds.amazonaws.com", "groupOneDB", "groupone", "groupOneDB");
	
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$firstName = mysqli_real_escape_string($conn,$inData["FirstName"]);
		$lastName = mysqli_real_escape_string($conn,$inData["LastName"]);
		$email = mysqli_real_escape_string($conn,$inData["Email"]);
		$login = mysqli_real_escape_string($conn,$inData["Login"]);
		$password = mysqli_real_escape_string($conn,$inData["Password"]);

		$sql = "SELECT UserName, Email FROM Users where UserName = '".$login."' or Email = '".$email."'";
   
		$result = $conn->query($sql);
  
		if ($result-> num_rows > 0)
  		{
	 		 while ($row = $result->fetch_assoc())
	 		 {
		//echo "Username: ". $row[UserName]. "   Email: ". $row[Email]. "<br>";
		
				if ($row[UserName] == $email or $row[Email] == $email)
				{
					userError("Username or Email already taken");
				}
			}
	    }

	  	else
		{
			// create new User
			$usercreate = "INSERT INTO Users (UserName,Pass,FirstName,LastName,Email) VALUES ('" . $login . "','" . $password ."','" . $firstName ."','" . $lastName . "','" .$email. "')";		
		
			if( $result = $conn->query($usercreate) != TRUE )
			{
				returnWithError( $conn->error );
			}

			
			// create new Fridge
			$getUserId = "SELECT User_ID FROM Users WHERE UserName ='" . $login . "'";
			$result1 = $conn->query($getUserId);

			if ($result1->num_rows > 0)
			{
				$row1 = $result1->fetch_assoc();
				$id = $row1["User_ID"];
			}
			else
			{
				returnWithError( "Error creating new fridge" );
			}
			
			$fridgecreate = "INSERT INTO Fridge (User_ID,Fridge_ID) VALUES ('" . $id . "','" . $id . "')";
			$result2 = $conn->query($fridgecreate);

			if($result2 != TRUE)
			{
				returnWithError( $conn->error);
			}

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