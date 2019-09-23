
var urlBase = ' http://18.219.40.125/wtf_test/API';
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
    
	//document.getElementById("loginResult").innerHTML = "";

    // add hash back in
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			//document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
            alert("User/Password combination incorrect");
            return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

        alert(firstName+" "+lastName);

	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";	

    var tableBody = document.getElementById("listContacts").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";
    
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
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
    var newUserName = document.getElementById("newUserName").value;
    var newUserPass = document.getElementById("newUserPass").value;
    var hashPass = md5(newUserPass);
    var newFirst = document.getElementById("newUserFirst").value;
    var newLast = document.getElementById("newUserLast").value;
    if (newUserName != "" && newUserPass != "" && newFirst !="" && newLast != "") {

        document.getElementById("userAddResult").innerHTML = "";

        var jsonPayload = '{"FirstName" : "' + newFirst + '", "LastName" : "' + newLast + '", "Login" : "' + newUserName + '", "Password" : "' + hashPass +'"}';
        var url = urlBase + '/AddUser.' + extension;


        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Your account has been successfully created!");
                    cancelRegistration();
                }
            };

            xhr.send(jsonPayload);
        }
        catch (err) {
            document.getElementById("userAddResult").innerHTML = err.message;
        }


    }
    else
        alert("Stop! Please make sure all fields are completed.");
}
