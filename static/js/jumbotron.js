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
                            m("input.form-control", {id: "register-password", onkeyup: m.withAttr("value", jumbotron.controller.checkPass), placeholder: "Password", /*onchange: m.withAttr("type", jumbotron.controller.showPass)*/ type: "password", value: ""}),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-confirm-password"}, "Confirm Password:"),
                            m("input.form-control", {id: "register-confirm-password", onkeyup: m.withAttr("value", jumbotron.controller.checkPass), placeholder: "Confirm Password", type: "password", value: ""}),
                            m("input#showPass.pull-right", {type: "checkbox", name: "showPass", style: "margin-left: 5px", onchange: m.withAttr("input", jumbotron.controller.showPass)}),
                            m("label.pull-right", {for: "showPass"}, "Show Password"),
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

//first use of m.prop and m.withAttr:
//Make a checkbox on the side of the register password fields that when checked, will show the users password.
//It will update the type of the password fields to be either "password" or "text"

jumbotron.controller =  {
    checkPass: function() {
        var pass1 = $("#register-password");
        var pass2 = $("#register-confirm-password");
        var message = $("#confirm-msg");
        var goodColor = "#62BF65";
        var badColor = "#E67373";
        var whiteColor = "#ffffff";
        var greyColor = "#808080";
        console.log(pass1.val().search(/[\w\d\s]/));
        if (pass2.val() === "") {
            pass2.css("background-color", whiteColor);
            message.css("color", greyColor);
            message.html("Please enter password twice.");
        } else if (pass1.val().search(/[^\w*\d*]/) != -1) {
            pass2.css("background-color", badColor);
            message.css("color", badColor);
            message.html("Password contains invalid character(s)!");
        } else if (pass2.val().search(/[^\w*\d*]/) != -1) {
            pass2.css("background-color", badColor);
            message.css("color", badColor);
            message.html("Password contains invalid character(s)!");
        } else if(pass1.val() === pass2.val()) {
            pass2.css("background-color", goodColor);
            message.css("color", goodColor);
            message.html("Passwords match.");
        } else {
            pass2.css("background-color", badColor);
            message.css("color", badColor);
            message.html("Passwords do not match!");
        }
    },
    showPass: function() {
        var pass1 = $("#register-password");
        var pass2 = $("#register-confirm-password");
        var isChecked = $("#showPass").prop("checked");
        console.log(isChecked);
        if(isChecked) {
            pass1.attr("type", "text");
            pass2.attr("type", "text");
        } else {
            pass1.attr("type", "password");
            pass2.attr("type", "password");
        }
    }
};

function User(username, password, phone, address) {
    this.username = username;
    this.password = password;
    this.phone = phone;
    this.address = address;
}

var cameronTestUser = new User("cameron", "777777", "555-555-5555", "123 St.");
console.log(cameronTestUser);

$(document).ready(function() {
    $('#register-btn').click(function () {
        var userInput = $('#register-username');
        var passInput = $('#register-password');
        var emailInput = $('#register-email');
        var phoneInput = $('#register-phone');
        var addressInput = $('#register-address');
        var message = $('#register-error-msg');
        var goodColor = "#62BF65";
        var badColor = "#E67373";
        $.ajax({
            type: "POST",
            url: "/register",
            data: JSON.stringify({"username":userInput.val(), "password":passInput.val(), "email":emailInput.val(), "phone":phoneInput.val(), "address":addressInput.val()}),
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
        var userInput = $('#login-username').val();
        var passInput = $('#login-password').val();
        var message   = $('#login-error-msg');
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
                if (msg.error == "Logged In") {
                    message.css("color", goodColor);
                    document.location.reload(true);
                }
                else {
                    message.css("color", badColor);
                }
            },
            failure: function(msg) {
                console.log("Error in /login: " + msg);
            }
        });
    });
});