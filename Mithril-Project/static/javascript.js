/*
Author: Cameron Cooks
Notes: As of JQuery update 2.1.1 JSON.parse is no longer needed. dataType = application/json
specifies to the AJAX call that the data should automagically be parsed as JSON.
*/

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' '){
        	c = c.substring(1);
        }
        if (c.indexOf(name) != -1){
        	 return c.substring(name.length,c.length);	
        }
    }
    return "";
} 

function showAccountPage(showhide){
	if(showhide == "show"){
		document.getElementById('paragraphText').style.visibility="hidden";
		document.getElementById('accountText').style.visibility="visible";
	}else if(showhide == "hide"){
		document.getElementById('accountText').style.visibility="hidden";
		document.getElementById('paragraphText').style.visibility="visible";
	}	
}

/*
checkPass checks the value of the two password fields, registerPassword and registerConfirmPassword. 
The values are checked .onKeyUp in the div '.registerConfirmPasswordWrapper'.
*/
function checkPass() {
	var pass1 = document.getElementById('register-password');
	var pass2 = document.getElementById('register-confirm-password');
	var message = document.getElementById('confirm-msg');
	var goodColor = "#62BF65";
	var badColor = "#E67373";
	var whiteColor = "#ffffff"
	var greyColor = "#808080"
	if(pass2.value == ""){
		pass2.style.backgroundcolor = whiteColor;
		message.style.color = greyColor;
		message.innerHTML = "Please Enter a Password" 
	} else if(pass1.value == pass2.value){
		pass2.style.backgroundColor = goodColor;
		message.style.color = goodColor;
		message.innerHTML = "Passwords Match!";
	} else {
		pass2.style.backgroundColor = badColor;
		message.style.color = badColor;
		message.innerHTML = "Passwords Do Not Match!";
	}
}

/*                  Account Info
TODO: Encrypt this data when it's being passed on the line. 
Unencrypts client side AFTER the session is verified. 
*/
$(document).ready(function() {
	var session = getCookie('session');
	$.ajax({
		type: "POST",
		url: "/accountInfo",
		data: JSON.stringify({"session":session}),
		dataType: "JSON",
		contentType: "application/json",
		async: true,
		cache: false, 
		success: function (msg) {
			var data = msg;//JSON.parse(msg);
			var username = data.username;
			var email = data.email;
			var phone = data.phone;
			var address = data.address;
			$('#account').text(username);
			$('#accountText').html(
				"<br> Username: " + username +
				"<br>Email: " + email +
				"<br>Phone: " + phone +
				"<br>Address: " + address)
		}
	});
});

/*                             Register
This data should be encrypted client side before it passes it to the server,
where it is THEN encoded into the DB.
*/
$(document).ready(function() {
	$('#registerBtn').click(function () {
		var userInput = document.getElementById('register-username').value;
		var passInput = document.getElementById('register-password').value;
		var emailInput = document.getElementById('register-email').value;
		var phoneInput = document.getElementById('register-phone').value;
		var addressInput = document.getElementById('register-address').value;
		var userField = document.getElementById('register-username');
		var message = document.getElementById('register-error-msg');
		var goodColor = "#62BF65";
		var badColor = "#E67373";
		$.ajax({
			type: "POST",
			url: "/register",
			data: JSON.stringify({"username":userInput, "password":passInput, "email":emailInput, "phone":phoneInput, "address":addressInput}),
			dataType: "JSON",
			contentType: "application/json",
			async: true,
			cache: false, 
			success: function (msg) {
				//msg = JSON.parse(msg);
				$('#register-error-msg').text(msg.error);
				if(msg.error == 'Account Created'){
					userField.style.backgroundColor = goodColor;
					message.style.color = goodColor;
					document.location.reload(true);
				}
				if(msg.error != 'Account Created'){
					userField.style.backgroundColor = badColor;
					message.style.color = badColor;

				}
			}
		});
	});
});

/*                                Login
These credentials should be encrypted before being sent back to the server. \
*/
$(document).ready(function() {
	$('#login-btn').click(function () {
		var userInput = document.getElementById('login-username').value;
		var userField = document.getElementById('login-username');
		var passInput = document.getElementById('login-password').value;
		var passField = document.getElementById('login-password');
		var message   = document.getElementById('login-error-msg');
		var goodColor = "#62BF65";
		var badColor = "#E67373";
		$.ajax({
			type: "POST",
			url: "/login",
			data: JSON.stringify({"username":userInput, "password":passInput}),
			dataType: "JSON",
			contentType: "application/json",
			async: true,
			cache: false, 
			success: function (msg) {
				//msg = JSON.parse(msg);
				$('#login-error-msg').text(msg.error);
				if(msg.error == "Logged In"){
					//userField.style.backgroundColor = goodColor;
					//passField.style.backgroundColor = goodColor;
					message.style.color = goodColor;
					document.location.reload(true);
				}
				if(msg.error != 'Logged In'){
					//userField.style.backgroundColor = badColor;
					//passField.style.backgroundColor = badColor;
					message.style.color = badColor;
				}
			}
		});
	});
});