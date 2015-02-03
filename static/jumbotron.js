var jumbotron = {};
jumbotron.view = function(ctrl) {
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
                            m("input.form-control", {id: "register-password", onkeyup: "checkPass(); return false;", placeholder: "Password", type: "password"}),
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "register-confirm-password"}, "Confirm Password:"),
                            m("input.form-control", {id: "register-confirm-password", onkeyup: "checkPass(); return false;", placeholder: "Confirm Password", type: "password"}),
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
                        m("a.btn.btn-primary.pull-right", {id: "registerBtn"}, "Register"),
                    ])
                ])
            ])
        ])]
    ])//end jumbotron div
};//end

jumbotron.controller = function() {};