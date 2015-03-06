var loginModal = {};

loginModal.view = function(ctrl) {
    //                                LOGIN MODAL
    return m("div", {class: "modal fade", id: "loginModal", role: "dialog"}, [
        m("div", {class: "modal-dialog"}, [
            m("div", {class: "modal-content"}, [
                m("div", {class: "modal-header"}, [
                    m("h4", "Login"),
                ]),
                m("div", {class: "modal-body"}, [
                    m("center", [
                        m("span#login-error-msg", {onkeyup: m.withAttr("value", ctrl.responseMessage), style: ctrl.responseMessageColor()}, ctrl.responseMessage()),
                    ]),
                    m("div", {class: "form-group"}, [
                        m("label", {for: "login-username", class: "col-lg-2 control-label"}, "Username"),
                        m("input#login-username.form-control", {onkeyup: m.withAttr("value", ctrl.username), type: "text", placeholder: "Username"}, ctrl.username()),
                    ]),
                    m("div", {class: "form-group"}, [
                        m("label", {for: "login-password", class: "col-lg-2 control-label"}, "Password"),
                        m("input#login-password.form-control", {onkeyup: m.withAttr("value", ctrl.password), type: "password", placeholder: "Password"}, ctrl.password()),
                    ]),
                    m("div", {class: "modal-footer"}, [
                        m("a#login-btn.btn.btn-primary", {onclick: ctrl.login, value: "Login"}, "Login"),
                        m("a.btn.btn-primary.pull-left", {"data-dismiss": "modal"}, "Close"),
                    ])
                ])
            ])
        ])
    ])
};


loginModal.controller = function() {
    var me = {};
    me.username = m.prop("");
    me.password = m.prop("");
    me.responseMessage = m.prop("");
    me.responseMessageColor = m.prop("");
    me.login = function () {
        if(!inputValidation.isAlpha(me.username())) {
            me.responseMessage("Username contains invalid characters");
        } else if(!inputValidation.isAlpha(me.password())) {
            me.responseMessage("Password contains invalid characters");
        } else {
            $.ajax({
                type: "POST",
                url: "/login",
                data: JSON.stringify({"username": me.username(), "password": me.password()}),
                dataType: "JSON",
                contentType: "application/json",
                async: true,
                cache: false,
                success: function (msg) {
                    //msg = JSON.parse(msg);
                    me.responseMessage(msg.error);
                    if (msg.error == "Logged In") {
                        me.responseMessageColor("color: " + colors.goodColor);
                        document.location.reload(true);
                    }
                    else {
                        me.responseMessageColor("color: " + colors.badColor);
                    }
                },
                failure: function (msg) {
                    console.log("Error in /login: " + msg);
                }
            });
        }
    };
    return me;
};

