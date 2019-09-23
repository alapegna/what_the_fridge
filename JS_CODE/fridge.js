//this will be the main program, holding the objects used by the fridge.
// IT'S ALIVE!!!!!

var urlBase = ' http://18.188.138.119/wtf_test/API';
var extension = "php";

var userId;
var firstName;
var lastName;
var rowCount = 0;
var searchRows = 0;
var clearCount = 0;
var search = "";

var cookieList = "";
var proteinList = [];
var vegetableList = [];
var dairyList = [];
var carbList = [];
var spiceList = [];
var masterList = [];

var ingredients = document.getElementById("ingredients");
//ingredients.innerHTML = "";

var quantityList = document.getElementById("quantityList");
//quantityList.innerHTML = "";

for(i = 0.25; i < 30.25; i = i + 0.25)
{
	var opt = document.createElement("option");
	opt.text = i;
	opt.value = i;
	quantityList.options.add(opt);
}

var ingredientTypes = document.getElementById("ingredientTypes");
ingredientTypes.innerHTML = "";
var types = ["","Protein", "Vegetable", "Carb", "Dairy", "Spice"];

for(i = 0; i <= 5; i++)
{
	var opt = document.createElement("option");
	opt.text = types[i];
	opt.value = i;
	ingredientTypes.options.add(opt);
}

//clears the fridge.
function clearFridge(table)
{

	//we're gonna get all the lists, and light em up.
	proteinList = [];
	vegetableList = [];
	dairyList = [];
	carbList = [];
	spiceList = [];
	clearCount--;

	for (var i = 0; i <= rowCount; i++) 
	{
		table.deleteRow(0);
	}
}
function addIngredient()
{
	var type = document.getElementById('ingredientTypes');
	var ingredient = document.getElementById('ingredients');
	var quantity = document.getElementById('quantityList');
	//var localIndex = index;

	var ingredientValue = ingredient.options[ingredient.selectedIndex].value;
	var ingredientText = ingredient.options[ingredient.selectedIndex].text;
	var ingredientType = type.options[type.selectedIndex].value;
    var quantityValue = quantity.options[quantity.selectedIndex].value;

		    if(ingredientType == 1)
	    	{
	    	proteinList.push(ingredientValue);
	    	proteinList.push(quantityValue);
	    	}
	    	
	    	else if(ingredientType == 2)
	    	{
	    	vegetableList.push(ingredientValue);
	    	vegetableList.push(quantityValue);
	    	}

	    	else if(ingredientType == 4)
	    	{
	    	dairyList.push(ingredientValue);
	    	dairyList.push(quantityValue);
	    	}

	    	else if(ingredientType == 3)
	    	{
	    	carbList.push(ingredientValue);
	    	carbList.push(quantityValue);
	    	}

	        else if(ingredientType == 5)
	    	{
	    	spiceList.push(ingredientValue);
	    	spiceList.push(quantityValue);
	    	}

	var tableRef = document.getElementById('mytable').getElementsByTagName('tbody')[0];

	 // Insert a row in the table at the last row var 
	 newRow = tableRef.insertRow(tableRef.rows.length);
	 //keep track of the rows;
	 rowCount++;

	  // Insert a cell in the row at index 0 
	  var newCell0 = newRow.insertCell(0); 
	  var newCell1 = newRow.insertCell(1); 
	  var newCell2 = newRow.insertCell(2);

	  //add button
	   var btn = document.createElement("BUTTON");
	   var text = document.createTextNode("Delete"); 
       btn.appendChild(text);
       btn.value = newRow.rowIndex;
       btn.name = "deleteIngBtn";
       btn.setAttribute('ingType', ingredientType);
       btn.setAttribute('ingId', ingredientValue)
       btn.setAttribute('class', 'btn btn-danger');

       //alert(btn.value);
       btn.onclick = function () {
           deleteIngredient(btn.value, btn.getAttribute("ingType"), btn.getAttribute("ingId"))
       };
	   


	   // Append a text node to the cell
	    var newText = document.createTextNode(ingredientText); 
	    var newText1 = document.createTextNode(document.getElementById('quantityList').value); 
	    newCell0.appendChild(newText); 
	    newCell1.appendChild(newText1); 
        newCell1.setAttribute('contentEditable', 'true');
        newCell2.appendChild(btn);

    /*
        alert(arrayToString(proteinList));
        alert(arrayToString(vegetableList));
        alert(arrayToString(carbList));
        alert(arrayToString(dairyList));
        alert(arrayToString(spiceList));
    */
        return false;
}

function deleteIngredient(row,type,id)
{
    tableRef = document.getElementById("mytable");
    tableRef.deleteRow(row);

    if (type == 1)
    {
        for (i = 0; i < proteinList.length; i+=2)
        {
            if(proteinList[i] == id)
                proteinList.splice(i, 2);
        }
        //alert(arrayToString(proteinList));
    }

    if (type == 2)
    {
        for (i = 0; i < vegetableList.length; i += 2)
        {
            if (vegetableList[i] == id)
                vegetableList.splice(i, 2);
        }
        //alert(arrayToString(vegetableList));
    }

    if (type == 3)
    {
        for (i = 0; i < carbList.length; i += 2)
        {
            if (carbList[i] == id)
                carbList.splice(i, 2);
        }
        //alert(arrayToString(carbList));
    }


    if (type == 4)
    {
        for (i = 0; i < dairyList.length; i += 2)
        {
            if (dairyList[i] == id)
                dairyList.splice(i, 2);
        }
        //alert(arrayToString(dairyList));
    }


    if (type == 5)
    {
        for (i = 0; i < spiceList.length; i += 2)
        {
            if (spiceList[i] == id)
                spiceList.splice(i, 2);
        }
        //alert(arrayToString(spiceList));
    }

}


//takes an array, turns it into a string with colons in between Ings and Quants, and commas separating
//ingredients. 
function arrayToString(array)
{
	var length = array.length;
	var result = "";
	var colon = ":";
	var comma = ",";

	for(var i = 0; i<length; i = i + 2)
		{
			result = result.concat(array[i],colon,array[i+1],comma);
		}

return result;
}

function arrayToStringSearch(array) {
    var length = array.length;
    var result = "";
    //var colon = ":";
    var comma = ",";

    for (var i = 0; i < length; i = i + 2) {
        result = result.concat(array[i], comma);
    }

    return result;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function updateFridge()
{
    userId = getCookie("userId");

    var url = urlBase + '/UpdateFridge.' + extension;

    var protString = arrayToString(proteinList);
    var vegetableString = arrayToString(vegetableList);
    var dairyString = arrayToString(dairyList);
    var carbString = arrayToString(carbList);
    var spiceString = arrayToString(spiceList);
	

     // JSON for updating ingredients in DB
	 var jsonIngredients = '{"UserID" : "' + userId + '", "Proteins" : "' + protString + '", "Vegetables" : "' + vegetableString + '", "Dairy" : "' 
         + dairyString + '", "Carbs" : "' + carbString + '", "Spices" : "' + spiceString + '"}';

     //alert(jsonIngredients);

	 var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function ()
             {
                if (this.readyState == 4 && this.status == 200) 
                {
                    document.getElementById("submitFridgeAlert").innerHTML = "<b>Your changes have been saved!</b><br>";
                }
            };

            xhr.send(jsonIngredients);
            var jsonObject = JSON.parse( xhr.responseText);

            if(jsonObject !== "")
            {
                document.getElementById("submitFridgeAlert").innerHTML = "<b>Error saving your fridge: " + xhr.responseText + "</b><br>"; 
            }
        }

        catch (err) 
        {
            document.getElementById("submitFridgeAlert").innerHTML = "<b>Error connecting to database: " + err.message + "</b><br>";
        }

    /*
        //clear the lists
        protList = [];
        vegetableList = [];
        dairyList = [];
        carbList = [];
        spiceList = [];
    */
}

function searchRecipe()
{
    //alert("Searching recipes...");

    userId = getCookie("userId");

    var url = urlBase + '/SearchRecipe.' + extension;

    var protString = arrayToStringSearch(proteinList);
    var vegetableString = arrayToStringSearch(vegetableList);
    var dairyString = arrayToStringSearch(dairyList);
    var carbString = arrayToStringSearch(carbList);
    var spiceString = arrayToStringSearch(spiceList);

    var jsonSearch = '{"UserID" : "' + userId + '", "Proteins" : "' + protString + '", "Carbs" : "' + carbString + '"}';

    //alert("JSON Search: " + jsonSearch);
    //alert("Carb String: " + carbString);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("searchRecipeAlert").innerHTML = "<b>Searching Recipes...</b><br>";
            }
        };

        xhr.send(jsonSearch);
        document.cookie = "search=" + xhr.responseText;
        
        //alert("Response Text: " + getCookie("search"));

        window.location.replace("http://18.188.138.119/wtf_test/search.html");
        return false;
    }

    catch (err) {
        document.getElementById("searchRecipeAlert").innerHTML = "<b>Error in Searching Recipes: " + err.message + "</b><br>";
    }
}

function displaySearch()
{
    rowCount = 0;
    var search = getCookie("search");
    var jsonObject = JSON.parse(search);

    var tableRef = document.getElementById("searchTable").getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";

    var i;
   
    for (i = 0; i < jsonObject.results.length; i +=4)
    {
        rowCount++;
        var tr = document.createElement("tr");
        tr.setAttribute('name',jsonObject.results[i]);
        tr.innerHTML = '<td class="number text- center">' + rowCount + '</td>';
        tr.innerHTML += '<td class="image"><img src="' + jsonObject.results[i+3] + '" alt=""></td>';
        tr.innerHTML += '<td class="product"><strong>' + jsonObject.results[i] + '</strong></td>';
        tr.innerHTML += '<td class="product">' + jsonObject.results[i+1] + '</td>';
        tr.innerHTML += '<td class="number text- center">' + jsonObject.results[i + 2] + '</td>';

        tableRef.appendChild(tr);
    }

    for (i = 0; i < tableRef.rows.length; i++)
    {
        tableRef.rows[i].onclick = function () { openRecipe(this.rowIndex,this.getAttribute("name")); };
    }
}

function filterSearch()
{
    var i;
    var filter = document.getElementsByName("filter");
    var selectedFilter;

    // get filter criteria
    for (i = 0; i < filter.length; i++)
    {
        if (filter[i].checked)
        {
            selectedFilter = filter[i].value;
            break;
        }
    }

    // filter table rows based on filter criteria
    var tableRef = document.getElementById("searchTable").getElementsByTagName('tbody')[0];
    var tr = tableRef.getElementsByTagName("tr");

    if (selectedFilter != "")
    {
        for (i = 0; i < tr.length; i++)
        {
            td = tr[i].getElementsByTagName('td')[3];
            
           if (td.innerHTML == selectedFilter)
                tr[i].style.display = "";
            else
                tr[i].style.display = "none";
        }
    }
    else
    {
        for (i = 0; i < tr.length; i++)
        {
                tr[i].style.display = "";
        }
    }

}

function barSearch()
{
    var i;
    var filter = document.getElementById("searchBar");
    var search = filter.value;

    var tableRef = document.getElementById("searchTable").getElementsByTagName('tbody')[0];
    var tr = tableRef.getElementsByTagName("tr");

    if (search != "") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName('td')[2];

            //alert(search + " " + td.innerHTML);

            var n = td.innerHTML.search(search);

            //alert(n);

            if (n > -1)
                tr[i].style.display = "";
            else
                tr[i].style.display = "none";
        }
    }
    else {
        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "";
        }
    }
}

function openRecipe(row,name)
{
    var url = urlBase + '/OpenRecipe.' + extension;
    var jsonPayload = '{"name" : "' + name + '"}';

    var modal = document.getElementById("recipeModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.send(jsonPayload);
        //alert("Recipe Content: " + xhr.responseText);

        var jsonObject = JSON.parse(xhr.responseText);

        // parse recipe content
        var recipeName = jsonObject.results[0];
        var recipeRating = jsonObject.results[1];
        var cuisine = jsonObject.results[2];
        var ingredients = jsonObject.results[3];
        var steps = jsonObject.results[4];
        var image = jsonObject.results[5];

        //alert("Name: " + recipeName + " \nRating: " + recipeRating + " \nCuisine: " + cuisine + "\nProteins: " + proteins + "\n Vegetables" + vegetables
            //+ "\nCarbs: " + carbs + "\nDairy: " + dairy + "\nSpices: "+spices +"\nSteps: " + steps + "\nImage: " + image);

        var getName = document.getElementById("recipeName");
        var getImage = document.getElementById("recipeImage");
        var getRating = document.getElementById("recipeRating");
        var getCuisine = document.getElementById("recipeCuisine"); 
        var getIngredients = document.getElementById("recipeIngredients");
        var getSteps = document.getElementById("recipeSteps");

        var newLine = "\n"
        ingredients = ingredients.split("|");
        steps = steps.split("|");

        getName.innerHTML = recipeName;
        getImage.innerHTML = '<img src="' + image + '" alt="" width = "300" height = "300">';
        getRating.innerHTML = "Rating: " + recipeRating;
        getCuisine.innerHTML = "Cuisine: " + cuisine;

        var ingredientString = "Ingredients:<br>";
        for (i = 0; i < ingredients.length; i++) {
            ingredientString += ingredients[i] + " <br>";
        }
        getIngredients.innerHTML = ingredientString + "<br>";

        var stepString = "Steps:<br>";
        for (i = 0; i < steps.length; i++) {
            stepString += steps[i] + " <br>";
        }
        getSteps.innerHTML = stepString;

    }
    catch (err) {
        document.getElementById("openRecipeAlert").innerHTML = "<b>Error opening recipe: " + err + "</b><br>";
    } 

    span.onclick = function () {
        modal.style.display = "none";
        getName.innerHTML = "";
        getImage.innerHTML = "";
        getRating.innerHTML = "";
        getCuisine.innerHTML = "";
        getIngredients.innerHTML = "";
        getSteps.innerHTML = "";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            getName.innerHTML = "";
            getImage.innerHTML = "";
            getRating.innerHTML = "";
            getCuisine.innerHTML = "";
            getIngredients.innerHTML = "";
            getSteps.innerHTML = "";
        }
    }
}

//array should be (a[n] = type, a[n+1] = ingredient)
function searchIngredient(type)
{
	var currentType = type;
	var currentIngredient = " ";
    var jsonPayload = '{"type" : "' + type + '"}';
	var url = urlBase + '/SearchIngredient.' + extension;

	var ingredientList = document.getElementById("ingredients");
	ingredientList.innerHTML = "";

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var jsonObject = JSON.parse(xhr.responseText);

                var i;
                for (i = 0; i < jsonObject.results.length; i += 2) 
                {
					var opt = document.createElement("option");
					opt.value = jsonObject.results[i];
					opt.text = jsonObject.results[i+1];
					ingredientList.options.add(opt);
                }
                
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("contactSearchResult").innerHTML = err.message;
    }
}

function openFridge()
{
    
    userId = getCookie("userId");
    
    var url = urlBase + '/OpenFridge.' + extension;
    var jsonPayload = '{"UserID" : "' + userId + '"}';

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.send(jsonPayload);

        var jsonObject = JSON.parse(xhr.responseText);

        var proteins = jsonObject.results[0];
        var vegetables = jsonObject.results[1];
        var carbs = jsonObject.results[2];
        var dairy = jsonObject.results[3];
        var spices = jsonObject.results[4];

        var proteinsArray = proteins.split(",");
        var vegetablesArray = vegetables.split(",");
        var carbsArray = carbs.split(",");
        var dairyArray = dairy.split(",");
        var spicesArray = spices.split(",");

        var proteinsSize = proteinsArray.length - 1;
        var vegetablesSize = vegetablesArray.length - 1;
        var carbsSize = carbsArray.length - 1;
        var dairySize = dairyArray.length - 1;
        var spicesSize = spicesArray.length - 1;

        var tableRef = document.getElementById('mytable').getElementsByTagName('tbody')[0];
        var ingredientList = document.getElementById("ingredients");


        // parse data into ingredients

        for (var i = 0; i < proteinsSize; i++)
        {
            var tempArray = proteinsArray[i].split(":");
            //alert(tempArray[0]);
            //alert(tempArray[1]);

            proteinList.push(tempArray[0]);
            proteinList.push(tempArray[1]);


            // Insert a row in the table at the last row var 
            newRow = tableRef.insertRow(tableRef.rows.length);
            //keep track of the rows;
            rowCount++;

            // Insert a cell in the row at index 0 
            var newCell0 = newRow.insertCell(0);
            var newCell1 = newRow.insertCell(1);
            var newCell2 = newRow.insertCell(2);

            //add button
            var btn = document.createElement("BUTTON");
            var text = document.createTextNode("Delete");
            btn.appendChild(text);
            btn.value = newRow.rowIndex;

            //alert(btn.value);
            btn.name = "deleteIngBtn";
            btn.setAttribute('ingType', 1);
            btn.setAttribute('ingId', tempArray[0]);
            btn.setAttribute('class', 'btn btn-danger');

            //alert(btn.value);
            btn.onclick = function () {
                deleteIngredient(btn.value, btn.getAttribute("ingType"), btn.getAttribute("ingId"))
            };

            var ingredientName = getIngredientName(tempArray[0]);

            //alert("getting Ingredient Name:" + ingredientName);

            // Append a text node to the cell
            var newText = document.createTextNode(ingredientName);
            var newText1 = document.createTextNode(tempArray[1]);
            newCell0.appendChild(newText);
            newCell1.appendChild(newText1);
            newCell1.setAttribute('contentEditable', 'true');
            newCell2.appendChild(btn);
        }

        for (var i = 0; i < vegetablesSize; i++) {
            var tempArray = vegetablesArray[i].split(":");
            //alert(tempArray[0]);
            //alert(tempArray[1]);

            vegetableList.push(tempArray[0]);
            vegetableList.push(tempArray[1]);


            // Insert a row in the table at the last row var 
            newRow = tableRef.insertRow(tableRef.rows.length);
            //keep track of the rows;
            rowCount++;

            // Insert a cell in the row at index 0 
            var newCell0 = newRow.insertCell(0);
            var newCell1 = newRow.insertCell(1);
            var newCell2 = newRow.insertCell(2);

            //add button
            var btn = document.createElement("BUTTON");
            var text = document.createTextNode("Delete");
            btn.appendChild(text);
            btn.value = newRow.rowIndex;

            //alert(btn.value);
            btn.name = "deleteIngBtn";
            btn.setAttribute('ingType', 2);
            btn.setAttribute('ingId', tempArray[0]);
            btn.setAttribute('class', 'btn btn-danger');
            btn.onclick = function () {
                deleteIngredient(btn.value, btn.getAttribute("ingType"), btn.getAttribute("ingId"))
            };

            var ingredientName = getIngredientName(tempArray[0]);

            //alert("getting Ingredient Name:" + ingredientName);

            // Append a text node to the cell
            var newText = document.createTextNode(ingredientName);
            var newText1 = document.createTextNode(tempArray[1]);
            newCell0.appendChild(newText);
            newCell1.appendChild(newText1);
            newCell1.setAttribute('contentEditable', 'true');
            newCell2.appendChild(btn);
        }

        for (var i = 0; i < carbsSize; i++) {
            var tempArray = carbsArray[i].split(":");
            //alert(tempArray[0]);
            //alert(tempArray[1]);

            carbList.push(tempArray[0]);
            carbList.push(tempArray[1]);


            // Insert a row in the table at the last row var 
            newRow = tableRef.insertRow(tableRef.rows.length);
            //keep track of the rows;
            rowCount++;

            // Insert a cell in the row at index 0 
            var newCell0 = newRow.insertCell(0);
            var newCell1 = newRow.insertCell(1);
            var newCell2 = newRow.insertCell(2);

            //add button
            var btn = document.createElement("BUTTON");
            var text = document.createTextNode("Delete");
            btn.appendChild(text);
            btn.value = newRow.rowIndex;;
            btn.name = "deleteIngBtn";
            btn.setAttribute('ingType', 3);
            btn.setAttribute('ingId', tempArray[0]);
            btn.setAttribute('class', 'btn btn-danger');

            //alert(btn.value);
            btn.onclick = function () {
                deleteIngredient(btn.value, btn.getAttribute("ingType"), btn.getAttribute("ingId"))
            };

            var ingredientName = getIngredientName(tempArray[0]);

            //alert("getting Ingredient Name:" + ingredientName);

            // Append a text node to the cell
            var newText = document.createTextNode(ingredientName);
            var newText1 = document.createTextNode(tempArray[1]);
            newCell0.appendChild(newText);
            newCell1.appendChild(newText1);
            newCell1.setAttribute('contentEditable', 'true');
            newCell2.appendChild(btn);
        }

        for (var i = 0; i < dairySize; i++) {
            var tempArray = dairyArray[i].split(":");
            //alert(tempArray[0]);
            //alert(tempArray[1]);

            dairyList.push(tempArray[0]);
            dairyList.push(tempArray[1]);


            // Insert a row in the table at the last row var 
            newRow = tableRef.insertRow(tableRef.rows.length);
            //keep track of the rows;
            rowCount++;

            // Insert a cell in the row at index 0 
            var newCell0 = newRow.insertCell(0);
            var newCell1 = newRow.insertCell(1);
            var newCell2 = newRow.insertCell(2);

            //add button
            var btn = document.createElement("BUTTON");
            var text = document.createTextNode("Delete");
            btn.appendChild(text);
            btn.value = newRow.rowIndex;
            btn.name = "deleteIngBtn";
            btn.setAttribute('ingType', 4);
            btn.setAttribute('ingId', tempArray[0]);
            btn.setAttribute('class', 'btn btn-danger');

            alert(btn.value);
            btn.onclick = function () {
                deleteIngredient(btn.value, btn.getAttribute("ingType"), btn.getAttribute("ingId"))
            };

            var ingredientName = getIngredientName(tempArray[0]);

            //alert("getting Ingredient Name:" + ingredientName);

            // Append a text node to the cell
            var newText = document.createTextNode(ingredientName);
            var newText1 = document.createTextNode(tempArray[1]);
            newCell0.appendChild(newText);
            newCell1.appendChild(newText1);
            newCell1.setAttribute('contentEditable', 'true');
            newCell2.appendChild(btn);
        }

        for (var i = 0; i < spicesSize; i++) {
            var tempArray = spicesArray[i].split(":");
            //alert(tempArray[0]);
            //alert(tempArray[1]);

            spiceList.push(tempArray[0]);
            spiceList.push(tempArray[1]);


            // Insert a row in the table at the last row var 
            newRow = tableRef.insertRow(tableRef.rows.length);
            //keep track of the rows;
            rowCount++;

            // Insert a cell in the row at index 0 
            var newCell0 = newRow.insertCell(0);
            var newCell1 = newRow.insertCell(1);
            var newCell2 = newRow.insertCell(2);

            //add button
            var btn = document.createElement("BUTTON");
            var text = document.createTextNode("Delete");
            btn.appendChild(text);
            btn.value = newRow.rowIndex;
            btn.name = "deleteIngBtn";
            btn.setAttribute('ingType', 5);
            btn.setAttribute('ingId', tempArray[0]);
            btn.setAttribute('class', 'btn btn-danger');

            alert(btn.value);
            btn.onclick = function () {
                deleteIngredient(btn.value, btn.getAttribute("ingType"), btn.getAttribute("ingId"))
            };

            var ingredientName = getIngredientName(tempArray[0]);

            //alert("getting Ingredient Name:" + ingredientName);

            // Append a text node to the cell
            var newText = document.createTextNode(ingredientName);
            var newText1 = document.createTextNode(tempArray[1]);
            newCell0.appendChild(newText);
            newCell1.appendChild(newText1);
            newCell1.setAttribute('contentEditable', 'true');
            newCell2.appendChild(btn);
        }

        //alert(arrayToString(proteinList));
        //alert(arrayToString(vegetableList));
        //alert(arrayToString(carbList));
        //alert(arrayToString(dairyList));
        //alert(arrayToString(spiceList));

    }
    catch (err)
    {
        //alert("Error opening fridge: " + err);
    }

}

function getIngredientName(ingredientId)
{
    var url = urlBase + '/GetIngredientName.' + extension;
    var jsonPayload = '{"Ingredient_ID" : "' + ingredientId + '"}';

    //alert("searching for ingredient name...");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        //alert("sending json..." + ingredientId);

        xhr.send(jsonPayload);

        //alert("json received..." + xhr.responseText);

        jsonObject = JSON.parse(xhr.responseText);

        //alert("json parsed");

        return jsonObject.results[0];
    }
    catch (err)
    {
        document.getElementById("Error Getting Ingredients: " + err);
    }
}


function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hashPass = md5(password);
 
	//document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hashPass + '"}';
	var url = urlBase + '/Login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;	
		document.cookie = "userId=" + userId;

		if( userId < 1 )
		{
		    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect<br>";
            return false;
		}
		
		firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        window.location.replace("http://18.188.138.119/wtf_test/myFridge.html");
        return false;

	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = "<b>Error Logging In: " + err.message + "</b><br>";
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
    lastName = "";

    window.location.replace("http://18.188.138.119/wtf_test/login.html");
    return false;
}

function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}
	
	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}

function openRegistration() {
    hideOrShow('loginDiv', false);
    hideOrShow('registerDiv', true);
}

function cancelRegistration() {
    hideOrShow('loginDiv', true);
    hideOrShow('registerDiv', false);
}

function addUser() {
    var userId = 0;
    var firstName = "";
    var lastName = "";
    var newFirst = document.getElementById("newUserFirst").value;
    var newLast = document.getElementById("newUserLast").value;
    var newEmail = document.getElementById("newUserEmail").value;
    var newUser = document.getElementById("newUserName").value;
    var newPass = document.getElementById("newPassword").value;
    var newPassConf = document.getElementById("confirmPassword").value;
    var hashPass = md5(newPass);

    var flag = 1

    if (newFirst == "") {
        document.getElementById("firstNameAlert").innerHTML = "<b>Enter a First Name.</b><br>";
        flag = 0;
    }
    else
        document.getElementById("firstNameAlert").innerHTML = "";

    if (newLast == "") {
        document.getElementById("lastNameAlert").innerHTML = "<b>Enter a Last Name.</b><br>";
        flag = 0;
    }
    else
        document.getElementById("lastNameAlert").innerHTML = "";


    if (newEmail == "") {
        document.getElementById("emailAlert").innerHTML = "<b>Enter a valid email.</b><br>";
        flag = 0;
    }
    else {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(newEmail))
        {
            document.getElementById("emailAlert").innerHTML = "<b>Enter a valid email.</b><br>";
            flag = 0;
        }
        else
            document.getElementById("emailAlert").innerHTML = "";
    }

    if (newUser == "") {
        document.getElementById("usernameAlert").innerHTML = "<b>Enter a username.</b><br>";
        flag = 0;
    }
    else
        document.getElementById("usernameAlert").innerHTML = "";


    if (newPass == "") {
        document.getElementById("passAlert").innerHTML = "<b>Enter a password.</b><br>";
        flag = 0;
    }
    else
        document.getElementById("passAlert").innerHTML = "";


    if (newPassConf == "") {
        document.getElementById("confirmPassAlert").innerHTML = "<b>Confirm your password. </b><br>";
        flag = 0;
    }
    else {
        var n = newPass.localeCompare(newPassConf);
        if (n != 0) {
            flag = 0;
            document.getElementById("confirmPassAlert").innerHTML = "<b>Passwords do not match. </b><br>";
        }
        else
            document.getElementById("confirmPassAlert").innerHTML = "";
    }

    if (flag == 0)
        return false

    if (newUser != "" && newPass != "" && newFirst !="" && newLast != "") {

        var jsonPayload = '{"FirstName" : "' + newFirst + '", "LastName" : "' + newLast +  '", "Email" : "' + newEmail + '", "Login" : "' + newUser + '", "Password" : "' + hashPass + '"}';
        var url = urlBase + '/AddUser.' + extension;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("registerAlert").innerHTML = "<b>Your account has been successfully created </b><br>";
                    cancelRegistration();
                }
            };

            xhr.send(jsonPayload);
            var jsonObject = JSON.parse( xhr.responseText);

            if(jsonObject !== "")
            {
                document.getElementById("registerAlert").innerHTML = "<b>Error Creating User: " + xhr.responseText + "</b><br>";
                return false;
            }
            else
            {
                window.location.replace("http://18.188.138.119/wtf_test/login.html");
                return false; 
            }

        }
        catch (err) {
            document.getElementById("registerAlert").innerHTML = "<b>Username or Email already in use!</b><br>";
            return false;
        }
    }
}

//chickenAlfredo da268994