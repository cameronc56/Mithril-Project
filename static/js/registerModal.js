var registerModal = {};

registerModal.view = function(ctrl) {
    //                               CREATE ACCOUNT MODAL
    var setAndCheck = function(prop) {
        return function(val) {
            // set value on property
            prop(val);

            // call the checkPass fx
            ctrl.checkPass();
        };
    };

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
                        m("input.form-control", {id: "register-password", onkeyup: m.withAttr("value", setAndCheck(ctrl.pass1)), placeholder: "Password", type: "password", value: ctrl.pass1()}),
                    ]),
                    m(".form-group", [
                        m("label.col-lg-2.control-label", {for: "register-confirm-password"}, "Confirm Password:"),
                        m("input.form-control", {id: "register-confirm-password", onkeyup: m.withAttr("value", setAndCheck(ctrl.pass2)), placeholder: "Confirm Password", type: "password", value: ctrl.pass2()}),
                        m("input#showPass.pull-right", {type: "checkbox", name: "showPass", style: "margin-left: 5px", onchange: m.withAttr("value", ctrl.showPass)}),
                        m("label.pull-right", {for: "showPass"}, "Show Password"),
                    ]),
                    m("center", [
                        m("span", {id: "confirm-msg"}, ctrl.message())
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

registerModal.controller = function() {
    var me = {};
    me.message =  m.prop("123123");
    me.pass1 = m.prop("asdf");
    me.pass2 = m.prop("asdf");

    me.checkPass =  function() {
        var message = me.message();
        var goodColor = "#62BF65";
        var badColor = "#E67373";
        var whiteColor = "#ffffff";
        var greyColor = "#808080";
        if (me.pass2() == "") {
            //pass2.css("border-color", "");
            //message.css("color", greyColor);
            //message.html("Please enter password twice.");
            me.message("Please enter password twice.");
        } else if (!helpers.inputValidation.isAlpha(me.pass1()) || !helpers.inputValidation.isAlpha(me.pass2())) {
            //pass2.css("border-color", badColor);
            //message.css("color", badColor);
            //message.html("Password contains invalid character(s)!");
            me.message("Password contains invalid character(s)!");
        } else if(me.pass1() === me.pass2()) {
            //pass2.css("border-color", goodColor);
            //message.css("color", goodColor);
            //message.html("Passwords match.");
            me.message("Passwords match.");
        } else {
            //pass2.css("border-color", badColor);
            //message.css("color", badColor);
            //message.html("Passwords do not match!");
            me.message("Passwords do not match!");
        }
    };
    me.showPass = function() {
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
    };
    return me;
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
            }
        });
    });
});
