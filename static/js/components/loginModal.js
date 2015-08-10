var loginModal = {};

loginModal.view = function(ctrl) {
    //                                LOGIN MODAL
    return m(".modal.fade#loginModal", {role: "dialog"}, [
        m(".modal-dialog", {style: "width: 30em;"}, [
            m(".modal-content", [
                m(".modal-header", [
                    m(".container-fluid", [
                        m(".row", [
                            m("h4.pull-left",  {style: "font-weight: bold;"}, "Login"),
                            m("a.btn.btn-primary.pull-right", {href:"#registerModal", "data-toggle":"modal"}, [
                                m("i.glyphicon.glyphicon-plus")
                            ], " Register"),
                            m("p.pull-right", {style: "margin-right: 10px; margin-top: 5px;"}, "New User?"),

                        ])
                    ])
                ]),
                m(".modal-body", [
                    m("center", [
                        m("span#login-error-msg", {onchange: m.withAttr("value", ctrl.responseMessage), style: ctrl.responseMessageColor() + "; font-weight: bold;"}, ctrl.responseMessage()),
                    ]),
                    m("form.form-horizontal", [
                        m(".input-group", {style: "margin-top: 10px;"}, [
                            m("span.input-group-addon", [
                                m("i.glyphicon.glyphicon-user")
                            ]),
                            m("input#login-username.form-control", {onchange: m.withAttr("value", ctrl.username), type: "text", placeholder: "Username"}, ctrl.username()),
                        ]),
                        m(".input-group", {style: "margin-top: 10px;"}, [
                            m("span.input-group-addon", [
                                m("i.glyphicon.glyphicon-lock")
                            ]),
                            m("input#login-password.form-control", {onchange: m.withAttr("value", ctrl.password), type: "password", placeholder: "Password"}, ctrl.password()),
                        ])
                    ]),
                    m(".modal-footer", {style: "margin-top: 10px; padding: 0px;"}, [
                        m("a#login-btn.btn.btn-primary.pull-right", {style: "margin-top: 10px;", onclick: ctrl.login, value: "Login"}, [m("i.glyphicon.glyphicon-log-in")], " Login"),
                        m("a.btn.btn-primary.pull-left", {style: "margin-top: 10px;", "data-dismiss": "modal"}, [m("i.glyphicon.glyphicon-remove")], " Close")
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
            me.responseMessageColor("color: " + colors.badColor);
        } else if(!inputValidation.isAlpha(me.password())) {
            me.responseMessage("Password contains invalid characters");
            me.responseMessageColor("color: " + colors.badColor);
        } else {
            m.request({
                method: "POST",
                url: "/login",
                data: {"username": me.username(), "password": me.password()}
            }).then(function(response) {
                me.responseMessage(response.response);
                if(response.response == "Logged In") {
                    me.responseMessageColor("color: " + colors.goodColor);
                    setTimeout(function() {
                        document.location.reload(true);
                    }, 500);
                } else {
                    me.responseMessageColor("color: " + colors.badColor);
                }
            })
        }
    };


    return me;
};

