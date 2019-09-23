<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$proteins = "";
	$carbs = "";
	$proteinCounter = 0;
	$carbCounter = 0;
	$i = 0;
	$j = 0;

	$conn = new mysqli("grouponedb.co9dcxo307nm.us-east-2.rds.amazonaws.com", "groupOneDB", "groupone", "groupOneDB");

	if ($conn->connect_error) 
	{
		userError( $conn->connect_error );
	} 
	else
	{
		$proteins  = $inData["Proteins"];
		$numProteins = substr_count($proteins,',');
		$proteinsArray = explode(",",$proteins);
		$proteinsCounter  = $numProteins;

		$sql = "SELECT Recipe_Name,Cuisine,Rating,Image FROM Recipes ";
		
		if($proteinsCounter > 0)
		{
			$sql .= "WHERE Proteins LIKE '%" . $proteinsArray[$i] . ":%'";
			$proteinsCounter--;
			$i++;

			
			while($proteinsCounter != 0)
			{
				$sql .= "AND Proteins LIKE '%" . $proteinsArray[$i] . ":%'";
				$proteinsCounter--;
				$i++;
			}	
		}
		
		
		$carbs  = $inData["Carbs"];
		$numCarbs = substr_count($carbs,',');
		$carbsArray = explode(",",$carbs);
		$carbsCounter  = $numCarbs;
		$i = 0;
		
		if($carbsCounter > 0)
		{
			if($numProteins > 0)
				$sql .= "AND Carb LIKE '%" . $carbsArray[$i] . ":%'";
			else
				$sql .= "WHERE Carb LIKE '%" . $carbsArray[$i] . ":%'";

			$carbsCounter--;
			$i++;
			
			while($carbsCounter != 0)
			{
				$sql .= "AND Carb LIKE '%" . carbsArray[$i] . ":%'";
				$carbsCounter--;
				$i++;
			}	
		}
		
		
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
				$searchResults .= '"' . $row["Recipe_Name"] . '", "' .$row["Cuisine"]. '", "'.$row["Rating"]. '", "' .$row["Image"]. '"';
			}
		}
		else
		{
			userError("No recipes found");
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