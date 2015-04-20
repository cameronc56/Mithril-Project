var accountPage = {};

accountPage.view = function(ctrl) {
    return m(".container", [
        m("p", "Username: " + ctrl.username()),
        m(".row", [
            m("input.form-control.pull-left", {placeholder: "Old Password", style: "width: 200px;"})
        ]),
        m(".row", [
            m("input.form-control.pull-left", {placeholder: "New Password", style: "width: 200px;"})
        ]),
        m(".row", [
            m("input.form-control.pull-left", {placeholder: "Confirm New Password", style: "width: 200px;"})
        ]),
        m(".row", [
            m("a.btn.btn-primary.pull-left", "Change Password")

        ])
    ])
};

accountPage.controller = function() {
    var me = {};
    me.username = m.prop("Username");
    cookies.checkSession(function(response) {me.username(response.username)});
    return me;
};