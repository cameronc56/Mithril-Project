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
                        m("span#register-error-msg", {onkeyup: m.withAttr("value", ctrl.successMessage), style: ctrl.successMessageColor()}, ctrl.successMessage())
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
                    ]),
                    m(".form-group", [
                        m("label.col-lg-2.control-label", {for: "register-phone"}, "Phone:"),
                        m("input#register-phone.form-control", {onkeyup: m.withAttr("value", ctrl.phone), placeholder: "Phone", type: "tel"}, ctrl.phone()),
                    ]),
                    m(".form-group", [
                        m("label.col-lg-2.control-label", {for: "register-address"}, "Address:"),
                        m("input#register-address.form-control", {onkeyup: m.withAttr("value", ctrl.address), placeholder: "Address", type: "text"}, ctrl.address()),
                    ])
                ]),
                m(".modal-footer", [
                    m("a.btn.btn-primary.pull-left", {"data-dismiss": "modal"}, "Close"),
                    m("a#register-btn.btn.btn-primary.pull-right", {onclick: ctrl.register}, "Register"),
                ])
            ])
        ])
    ])
};

registerModal.controller = function() {
    //init
    registerModal.colors = helpers.colors();
    registerModal.inputValidation = helpers.inputValidation();

    var me = {};
    me.message =  m.prop("");
    me.messageColor = m.prop("");
    me.pass1 = m.prop("");
    me.pass2 = m.prop("");
    me.pass2Color = m.prop("");
    me.checkPass = function() {
        if (me.pass2() == "") {
            me.message("Please enter password twice.");
            me.messageColor("color:" + registerModal.colors.greyColor);
            me.pass2Color("");
        } else if (!registerModal.inputValidation.isAlpha(me.pass1()) || !registerModal.inputValidation.isAlpha(me.pass2())) {
            me.message("Password contains invalid character(s)!");
            me.messageColor("color:" + registerModal.colors.badColor);
            me.pass2Color("border-color:" + registerModal.colors.badColor);
        } else if(me.pass1() === me.pass2()) {
            me.message("Passwords match.");
            me.messageColor("color:" + registerModal.colors.goodColor);
            me.pass2Color("border-color:" + registerModal.colors.goodColor);
        } else {
            me.message("Passwords do not match!");
            me.messageColor("color:" + registerModal.colors.badColor);
            me.pass2Color("border-color:" + registerModal.colors.badColor);
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
    me.password = me.pass1();
    me.email = m.prop("");
    me.phone = m.prop("");
    me.address = m.prop("");
    me.successMessage = m.prop("");
    me.successMessageColor = m.prop("");

    me.register = function() {
        $.ajax({
            type: "POST",
            url: "/register",
            data: JSON.stringify({
                "username": me.username(),
                "password": me.password,
                "email": me.email(),
                "phone": me.phone(),
                "address": me.address()
            }),
            dataType: "JSON",
            contentType: "application/json",
            async: true,
            cache: false,
            success: function (msg) {
                //msg = JSON.parse(msg);
                me.successMessage(msg.error);
                if (msg.error == 'Account Created') {
                    me.usernameColor("backgroundColor: " + registerModal.colors.goodColor);
                    me.messageColor("color: " + registerModal.colors.goodColor);
                    document.location.reload(true);
                }
                else {
                    me.username("backgroundColor: " + registerModal.colors.badColor);
                    me.message("color: " + registerModal.colors.badColor);
                }
            },
            failure: function (msg) {
                me.username("backgroundColor: " + registerModal.colors.badColor);
                me.message("color: " + registerModal.colors.badColor);
                console.log(msg);
            }
        });
    };
    return me;
};
