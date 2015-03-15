var accountPage = {};

accountPage.view = function(ctrl) {
    return m("div", [
        m("center", [
            m("p", ctrl.username())
        ])
    ])
};

accountPage.controller = function() {
    var me = {};
    me.username = m.prop("Username");
    me.checkSession = function() {
        var session = cookies.getCookie('session');
        $.ajax({
            type: "POST",
            url: "/account",
            data: JSON.stringify({"session":session}),
            dataType: "JSON",
            contentType: "application/json",
            async: true,
            cache: false,
            success: function (msg) {
                var data = msg;//JSON.parse(msg);
                var username = data.username;
                me.username(username);
            },
            failure: function(msg) {
                me.username("USERNAME RETRIEVAL FAILURE");
            }
        });
    };
    me.checkSession();
    return me;
};
