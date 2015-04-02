var accountPage = {};

accountPage.view = function(ctrl) {
    return m("div", [
        m("center", [
            m("p", "Username: " + ctrl.username())
        ])
    ])
};

accountPage.controller = function() {
    var me = {};
    me.username = m.prop("Username");
    cookies.checkSession(function(response) {me.username(response.username)});
    return me;
};