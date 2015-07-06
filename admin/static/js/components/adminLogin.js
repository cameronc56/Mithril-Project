var adminLogin = {};

adminLogin.view = function(ctrl) {
    return m(".container", {style: "margin-top: 20em;"}, [
        m(".col-md-6.col-md-offset-3.col-sm-6.col-sm-offset-3", [
            m(".panel.panel-default", [
                m(".panel-heading", [
                    m(".panel-title.text-center", "Admin Login")
                ]),
                m(".panel-body", [
                    m("center", [
                        m("span#login-error-msg", {style: ctrl.responseMessageColor()}, ctrl.responseMessage()),
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
                        ]),
                        m(".form-group", {style: "margin-top: 10px;"}, [
                            m(".col-sm-12.controls", [
                                m("button#login-btn.btn.btn-primary.pull-right", {onclick: ctrl.login}, [
                                    m("i.glyphicon.glyphicon-log-in")
                                ], " Login")
                            ])
                        ])
                    ])
                ])
            ])
        ])
    ])
};

adminLogin.controller = function() {
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
                    m.route("/admin");
                } else {
                    me.responseMessage("Invalid Username or Password");
                    me.responseMessageColor("color: " + colors.badColor);
                }
            })
        }
    };
    return me;
};