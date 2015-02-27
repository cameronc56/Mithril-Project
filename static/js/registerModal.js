var registerModal = {};

registerModal.view = function(ctrl) {
    //                               CREATE ACCOUNT MODAL
    return m(".modal.fade", {id: "createAccount", role: "dialog"}, [
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
                        m("input.form-control", {id: "register-password", onkeyup: m.withAttr("value", registerModal.controller.checkPass), placeholder: "Password", type: "password"}),
                    ]),
                    m(".form-group", [
                        m("label.col-lg-2.control-label", {for: "register-confirm-password"}, "Confirm Password:"),
                        m("input.form-control", {id: "register-confirm-password", onkeyup: m.withAttr("value", registerModal.controller.checkPass), placeholder: "Confirm Password", type: "password"}),
                        m("input#showPass.pull-right", {type: "checkbox", name: "showPass", style: "margin-left: 5px", onchange: m.withAttr("value", registerModal.controller.showPass)}),
                        m("label.pull-right", {for: "showPass"}, "Show Password"),
                    ]),
                    m("center", [
                        m("span", {id: "confirm-msg"}, registerModal.controller.message())
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
    ])
};

registerModal.controller =  {
    message: m.prop("123123"),
    checkPass: function() {
        var pass1 = $("#register-password");
        var pass2 = $("#register-confirm-password");
        //var message = $("#confirm-msg");
        var goodColor = "#62BF65";
        var badColor = "#E67373";
        var whiteColor = "#ffffff";
        var greyColor = "#808080";
        if (pass2.val() === "") {
            pass2.css("border-color", "");
            //message.css("color", greyColor);
            //message.html("Please enter password twice.");
            this.message = "Please enter password twice.";
        } else if (!helpers.inputValidation.isAlpha(pass1.val()) || !helpers.inputValidation.isAlpha(pass2.val())) {
            pass2.css("border-color", badColor);
            //message.css("color", badColor);
            //message.html("Password contains invalid character(s)!");
            this.message = "Password contains invalid character(s)!";
        } else if(pass1.val() === pass2.val()) {
            pass2.css("border-color", goodColor);
            //message.css("color", goodColor);
            //message.html("Passwords match.");
            this.message = "Passwords match.";
        } else {
            pass2.css("border-color", badColor);
            //message.css("color", badColor);
            //message.html("Passwords do not match!");
            this.message = "Passwords do not match!";
        }
    },
    showPass: function() {
        var pass1 = $("#register-password");
        var pass2 = $("#register-confirm-password");
        var isChecked = $("#showPass").prop("checked");
        if(isChecked) {
            pass1.attr("type", "text");
            pass2.attr("type", "text");
        } else {
            pass1.attr("type", "password");
            pass2.attr("type", "password");
        }
    }
};



$(document).ready(function() {
    $('#register-btn').click(function () {
        var username = $('#register-username');
        var password = $('#register-password');
        var email = $('#register-email');
        var phone = $('#register-phone');
        var address = $('#register-address');
        var message = $('#register-error-msg');
        var goodColor = "#62BF65";
        var badColor = "#E67373";
        $.ajax({
            type: "POST",
            url: "/register",
            data: JSON.stringify({"username":username.val(), "password":password.val(), "email":email.val(), "phone":phone.val(), "address":address.val()}),
            dataType: "JSON",
            contentType: "application/json",
            async: true,
            cache: false,
            success: function (msg) {
                //msg = JSON.parse(msg);
                $('#register-error-msg').text(msg.error);
                if(msg.error == 'Account Created'){
                    username.css("backgroundColor", goodColor);
                    message.css("color", goodColor);
                    document.location.reload(true);
                }
                else {
                    username.css("backgroundColor", badColor);
                    message.css("color", badColor);
                }
            },
            failure: function(msg) {
                username.css("backgroundColor", badColor);
                message.css("color", badColor);
                return m(".alert.alert-danger.alert-dismissible", {role: "alert"}, [
                    m("button.close", {type: "button", "data-dismiss": "alert", "aria-label": "close"}, [
                        m("span", {"aria-hidden": "true"}, "&times;")
                    ]),
                    "Warning! Account was not created!"
                ])
            }
        });
    });
});
