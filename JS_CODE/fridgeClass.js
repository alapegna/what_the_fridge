class fridge{

	constructor(myFridgeID, userID, ingredientList, favoriteRecipes)
	{
		this.myFridgeID = myFridgeID;
		this.userID = userID;
		this.ingredientList = ingredientList;
		this.favoriteRecipes = favoriteRecipes;
	}


	addIngredient(newIngredient) // needs to be linked to database
	{
		 if (newIngredient != "") 
		 {


		 this.ingredientList.push(newIngredient);
		return(newIngredient + " has been added to your fridge!");
		 }

		 else
		 	alert("Please enter a valid ingredient!")

	}

	removeIngredient(position)
	{
		var removed = this.ingredientList[position];
		this.ingredientList.splice(position,1);
		return(removed + " has been removed from your fridge!");
	}

	addToFavorites(recipe)
	{
		this.ingredientList.push(recipe);
		return(recipe + " Has been added to your favorites");
	}

	searchRecipe()
	{
		//JSON shit
	}

}

//var fridgey = new fridge(1,2,["tomato","potato","onion","lettuce","cheese","bun"])