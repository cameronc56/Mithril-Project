var jumbotron = {};

jumbotron.view = function(controller) {
    return m("div", [
        m("div", {class:"container"}, [
            m("div", {class:"jumbotron"}, [
                m("center", [
                    m("h1", "Quack"),
                    m("p", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea commodo consequat."),/*end paragraph*/
                    m("a", {class:"btn btn-default", href:"#loginModal",style: "margin-right:10px","data-toggle":"modal"}, "Login"),
                    m("a", {class:"btn btn-primary", href:"#createAccount", "data-toggle":"modal"}, "Create Account"),
                ]),//end center
            ]),//end jumbotron
        ]),//end container

//                                LOGIN MODAL
        m("div", {class: "modal fade", id: "loginModal", role: "dialog"}, [
            m("div", {class: "modal-dialog"}, [
                m("div", {class: "modal-content"}, [
                    m("div", {class: "modal-header"}, [
                        m("h4", "Login"),
                    ]),
                    m("div", {class: "modal-body"}, [
                        m("center", [
                            m("span", {id: "login-error-msg"}),
                        ]),
                        m("div", {class: "form-group"}, [
                            m("label", {for: "login-username", class: "col-lg-2 control-label"}, "Username"),
                            m("input", {id: "login-username", class: "form-control", type: "text", placeholder: "Username"}),
                        ]),
                        m("div", {class: "form-group"}, [
                            m("label", {for: "login-password", class: "col-lg-2 control-label"}, "Password"),
                            m("input", {id: "login-password", class: "form-control", type: "password", placeholder: "Password"}),
                        ]),
                        m("div", {class: "modal-footer"}, [
                            m("a", {id: "login-btn", class: "btn btn-primary", value: "Login"}, "Login"),
                            m("a", {class: "btn btn-primary pull-left", "data-dismiss": "modal"}, "Close"),
                        ]),
                    ]),
                ]),
            ]),
        ]),
//                               CREATE ACCOUNT MODAL
        [m(".modal.fade", {id: "createAccount", role: "dialog"}, [
            m(".modal-dialog", [
                m(".modal-content", [
                    m(".modal-header", [
                        m("h4", "Create Account")
                    ]),
                    m(".modal-body", [
                        m("center", [
                            m("span", {id: "register-error-msg"})
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-username"}, "Username:"),
                            m("input", {class: "form-control", id: "register-username", type:"text", placeholder: "Username"}),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: 'register-email'}, "Email:"),
                            m("input.form-control", {id: "register-email", placeholder: "Email", type: "email"}),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-password"}, "Password:"),
                            m("input.form-control", {id: "register-password", /*onkeyup: jumbotron.controller.checkPass(),*/ placeholder: "Password", type: "password"}),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-confirm-password"}, "Confirm Password:"),
                            m("input.form-control", {id: "register-confirm-password", /*onkeyup: jumbotron.controller.checkPass(),*/ placeholder: "Confirm Password", type: "password"}),
                        ]),
                        m("center", [
                            m("span", {id: "confirm-msg"}),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-phone"}, "Phone:"),
                            m("input.form-control", {id: "register-phone", placeholder: "Phone", type: "tel"}),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-address"}, "Address:"),
                            m("input.form-control", {id: "register-address", placeholder: "Address", type: "text"}),
                        ])
                    ]),
                    m(".modal-footer", [
                        m("a.btn.btn-primary.pull-left", {"data-dismiss": "modal"}, "Close"),
                        m("a.btn.btn-primary.pull-right", {id: "register-btn"}, "Register"),
                    ])
                ])
            ])
        ])]
    ])//end jumbotron div
};//end

jumbotron.controller =  {
    checkPass: function() {
        var pass1 = document.getElementById('register-password');
        var pass2 = document.getElementById('register-confirm-password');
        var message = document.getElementById('confirm-msg');
        var goodColor = "#62BF65";
        var badColor = "#E67373";
        var whiteColor = "#ffffff"
        var greyColor = "#808080"
        if(pass2.value == null || pass2.value == ""){
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

};

$(document).ready(function() {
    $('#register-btn').click(function () {
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
                else {
                    userField.style.backgroundColor = badColor;
                    message.style.color = badColor;
                }
            }
        });
    });
});

/*                                Login
*/

$(document).ready(function() {
    $('#login-btn').click(function () {
        var userInput = document.getElementById('login-username').value;
        var userField = document.getElementById('login-username');
        var passInput = document.getElementById('login-password').value;
        var passField = document.getElementById('login-password');
        var message   = document.getElementById('login-error-msg');
        var goodColor = "#62BF65";
        var badColor  = "#E67373";
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
                else {
                    //userField.style.backgroundColor = badColor;
                    //passField.style.backgroundColor = badColor;
                    message.style.color = badColor;
                }
            }
        });
    });
});