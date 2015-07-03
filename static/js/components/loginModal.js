var loginModal = {};

loginModal.view = function(ctrl) {
    //                                LOGIN MODAL
    return m("div", {class: "modal fade", id: "loginModal", role: "dialog"}, [
        m("div", {class: "modal-dialog"}, [
            m("div", {class: "modal-content"}, [
                m(".modal-header", [
                    m(".container-fluid", [
                        m(".row", [
                            m("h4.pull-left", "Login"),
                            m("a.btn.btn-primary.pull-right", {href:"#registerModal", "data-toggle":"modal"}, "Register"),
                            m("p.pull-right", {style: "margin-right: 10px; margin-top: 5px;"}, "New User?"),

                        ])
                    ])
                ]),
                m(".modal-body", [
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
                        m("a.btn.btn-primary.pull-left", {"data-dismiss": "modal"}, "Close")
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
            m.request({
                method: "POST",
                url: "/login",
                data: {"username": me.username(), "password": me.password()}
            }).then(function(response) {
                me.responseMessage(response.error);
                if(response.error == "Logged In") {
                    me.responseMessageColor("color: " + colors.goodColor);
                    document.location.reload(true);
                } else {
                    me.responseMessageColor("color: " + colors.badColor);
                }
            })
        }
    };
    return me;
};

