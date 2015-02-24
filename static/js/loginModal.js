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
                    ])
                ])
            ])
        ])
    ])
};

loginModal.controller = function() {};

$(document).ready(function() {
    $('#login-btn').click(function () {
        var username = $('#login-username');
        var password = $('#login-password');
        var message   = $('#login-error-msg');
        var goodColor = "#62BF65";
        var badColor  = "#E67373";
        $.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify({"username":username.val(), "password":password.val()}),
            dataType: "JSON",
            contentType: "application/json",
            async: true,
            cache: false,
            success: function (msg) {
                //msg = JSON.parse(msg);
                $('#login-error-msg').text(msg.error);
                if (msg.error == "Logged In") {
                    message.css("color", goodColor);
                    document.location.reload(true);
                }
                else {
                    message.css("color", badColor);
                }
            },
            failure: function(msg) {
                console.log("Error in /login: " + msg);
            }
        });
    });
});