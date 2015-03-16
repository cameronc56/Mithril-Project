var accountPage = {};

accountPage.view = function(ctrl) {
    ctrl.checkSession();
    return m("div", [
        m("center", [
            m("p", "Username: " + ctrl.username())
        ])
    ])
};

accountPage.controller = function() {
    var me = {};
    me.navbarUsername = m.prop("Account");
    me.username = m.prop("Username");
    me.checkSession = function() {
        if (cookies.getCookie('session')) {
            var session = JSON.stringify(cookies.getCookie('session'));
            m.request({
                method: "POST",
                url: "/account",
                data: {"session": session}
            }).then(function (response) {
                me.username(response.username);
                me.navbarUsername(response.username);
            });
        }
        ;
    }
    return me;
};