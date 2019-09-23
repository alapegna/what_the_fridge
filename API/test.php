<?php

  $login = 'RickyBoy';
  $password = '123';
  $firstName = 'Ricky';
  $lastName = 'Boy';
  $email = 'Ricky@boy.com';


  $conn = new mysqli("grouponedb.co9dcxo307nm.us-east-2.rds.amazonaws.com", "groupOneDB", "groupone", "groupOneDB");
 
  $sql = "SELECT UserName, Email FROM Users where UserName = '" . $login . "' or Email = '" .$email. "'";
   
  $result = $conn->query($sql);
  
  // If the SQL statement is correct and the DB is online, num_rows === 1
  if ($result-> num_rows > 0)
  {
	  while ($row = $result->fetch_assoc())
	  {
		//echo "Username: ". $row[UserName]. "   Email: ". $row[Email]. "<br>";
		
		if ($row[UserName] == $email or $row[Email] == $email)
		{
			echo "Already in there ASSHOLE";
			goto a;
		}
	  }
  }
  
			$usercreate = "INSERT INTO Users (UserName,Pass,FirstName,LastName,Email) VALUES ('" . $login . "','" . $password ."','" . $firstName ."','" . $lastName . "','" .$email. "')";		
			echo "It WORKS JOSE!";
		
			if( $result = $conn->query($usercreate) != TRUE )
			{
				returnWithError( $conn->error );
			}
  
  // Comparing the Login and Email in one Statement,
  //  it's just to avoid duplicates even if one of them is unique
  
  
  //else
  //{
	//  $usercreate = "INSERT INTO Users (UserName,Pass,FirstName,LastName,Email) VALUES ('" . $login . "','" . $password ."','" . $firstName ."','" . $lastName . "','" .$email. "')";		
	//	echo "It WORKS JOSE!";
		
	//	if( $result = $conn->query($usercreate) != TRUE )
	//	{
	//		returnWithError( $conn->error );
	//	}
 // }
	  
  a:
  $conn->close();
  
  
  
  
?>