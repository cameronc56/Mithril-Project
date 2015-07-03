var registerModal = {};
registerModal.view = function(ctrl) {
    //                               CREATE ACCOUNT MODAL
    return m(".modal.fade", {id: "registerModal", role: "dialog"}, [
            m(".modal-dialog", [
                m(".modal-content", [
                    m(".modal-header", [
                        m("h4", {style: "font-weight: bold;"}, "Create Account")
                    ]),
                    m(".modal-body", [
                        m("center", [
                            m("span#register-error-msg", {onkeyup: m.withAttr("value", ctrl.responseMessage), style: ctrl.responseMessageColor()}, ctrl.responseMessage())
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-username"}, "Username:"),
                            m("input#register-username.form-control", {onkeyup: m.withAttr("value", ctrl.username), style: ctrl.usernameColor(), type:"text", placeholder: "Username"}, ctrl.username()),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: 'register-email'}, "Email:"),
                            m("input#register-email.form-control", {onkeyup: m.withAttr("value", ctrl.email), placeholder: "Email", type: "email"}, ctrl.email()),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-password"}, "Password:"),
                            m("input#register-password.form-control", {onkeyup: _.compose(ctrl.checkPass, m.withAttr("value", ctrl.pass1)), placeholder: "Password", type: ctrl.pass1Type(), value: ctrl.pass1()}),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-confirm-password"}, "Confirm Password:"),
                            m("input.form-control", {id: "register-confirm-password", "style": ctrl.pass2Color(), onkeyup: _.compose(ctrl.checkPass, m.withAttr("value", ctrl.pass2)), placeholder: "Confirm Password", type: ctrl.pass2Type(), value: ctrl.pass2()}),
                            m("input#showPass.pull-right", {type: "checkbox", name: "showPass", style: "margin-left: 5px", onchange: _.compose(ctrl.showPass, m.withAttr("checked", ctrl.isChecked)), checked: ctrl.isChecked()}),
                            m("label.pull-right", {for: "showPass"}, "Show Password"),
                        ]),
                        m("center", [
                            m("span", {id: "confirm-msg", "style": ctrl.messageColor()}, ctrl.message())
                        ])
                    ]),
                    m(".modal-footer", [
                        m("a.btn.btn-primary.pull-left", {"data-dismiss": "modal"}, "Close"),
                        m("a#register-btn.btn.btn-primary.pull-right", {onclick: ctrl.register}, "Register"),
                    ])
                ])
            ])
        ]);
};

registerModal.controller = function() {
    var me = {};
    me.message =  m.prop("");
    me.messageColor = m.prop("");
    me.pass1 = m.prop("");
    me.pass2 = m.prop("");
    me.pass2Color = m.prop("");
    me.checkPass = function() {
        if (me.pass2() == "") {
            me.message("Please enter password twice.");
            me.messageColor("color:" + colors.greyColor);
            me.pass2Color("");
        } else if (!inputValidation.isAlpha(me.pass1()) || !inputValidation.isAlpha(me.pass2())) {
            me.message("Password contains invalid character(s)!");
            me.messageColor("color:" + colors.badColor);
            me.pass2Color("border-color:" + colors.badColor);
        } else if(me.pass1() === me.pass2()) {
            me.message("Passwords match.");
            me.messageColor("color:" + colors.goodColor);
            me.pass2Color("border-color:" + colors.goodColor);
        } else {
            me.message("Passwords do not match!");
            me.messageColor("color:" + colors.badColor);
            me.pass2Color("border-color:" + colors.badColor);
        }
    };
    me.pass1Type = m.prop("password");
    me.pass2Type = m.prop("password");
    me.isChecked = m.prop(false);
    me.showPass = function() {
        if(me.isChecked()) {
            me.pass1Type("text");
            me.pass2Type("text");
        } else {
            me.pass1Type("password");
            me.pass2Type("password");
        }
    };

    me.username = m.prop("");
    me.usernameColor = m.prop("");
    me.email = m.prop("");
    me.responseMessage = m.prop("");
    me.responseMessageColor = m.prop("");
    me.register = function() {
        var usernameValue = me.username();
        var passwordValue = me.pass1();
        if(!inputValidation.isAlpha(me.username())) {
            me.responseMessage("Invalid character in username");
            me.responseMessageColor("color: " + colors.badColor);
        } else if(!inputValidation.isAlpha(me.pass1())) {
            me.responseMessage("Invalid character in password");
            me.responseMessageColor("color: " + colors.badColor);
        } else if(!inputValidation.isEmail(me.email())) {
            me.responseMessage("Invalid Email");
            me.responseMessageColor("color: " + colors.badColor);
        } else if(usernameValue.length < 5 || passwordValue.length < 5) {
            me.responseMessage("Username and password must have more than 4 characters.");
            me.responseMessageColor("color: " + colors.badColor);
        } else {
            m.request({
                method: "POST",
                url: "/register",
                data: {"username": me.username(), "password": me.pass1(), "email": me.email()}
            }).then(function(response) {
                me.responseMessage(response.error);
                if (response.error == 'Account Created') {
                    me.usernameColor("background-color: " + colors.goodColor);
                    me.responseMessageColor("color: " + colors.goodColor);
                    document.location.reload(true);
                } else {
                    me.usernameColor("background-color: " + colors.badColor);
                    me.responseMessageColor("color: " + colors.badColor);
                }
            })

        }
    };
    return me;
};
