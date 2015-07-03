var adminNavbar = {};

adminNavbar.view = function(ctrl) {
    return m(".container", {style: "margin-top: 30%;"}, [
        m(".col-md-6.col-md-offset-3.col-sm-6.col-sm-offset-3", [
            m(".panel.panel-default", [
                m(".panel-heading", [
                    m(".panel-title.text-center", "Admin Login")
                ]),
                m(".panel-body", [
                    m("form.form-horizontal", [
                        m(".input-group", [
                            m("span.input-group-addon", [
                                m("i.glyphicon.glyphicon-user")
                            ]),
                            m("input#login-username.form-control", {type: "text", placeholder: "Username"})
                        ]),
                        m(".input-group", {style: "margin-top: 10px;"}, [
                            m("span.input-group-addon", [
                                m("i.glyphicon.glyphicon-lock")
                            ]),
                            m("input#login-password.form-control", {type: "password", placeholder: "Password"})
                        ]),
                        m(".form-group", {style: "margin-top: 10px;"}, [
                            m(".col-sm-12.controls", [
                                m("button#login-btn.btn.btn-primary.pull-right", [
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

adminNavbar.controller = function() {

};