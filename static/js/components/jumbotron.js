var jumbotron = {};

jumbotron.view = function(ctrl) {
    return m(".container", {style: "margin-bottom: -15px;"}, [
        m(".jumbotron", {style: "padding: 30px;"}, [
            m("center", [
                m("h1", {style: "margin-top: -10px;"}, "Quack!~"),
                m("p", "Welcome to LittleDucklingGames.com."),
                m("a", {class:"btn btn-default", href:"#loginModal", "data-toggle":"modal", style: "margin-right:10px;" + (ctrl.isLoggedInBool() == true ? "display: none;" : "")}, [
                    m("i.glyphicon.glyphicon-log-in")
                ], " Login"),
                m("a", {class:"btn btn-primary", href:"#registerModal", "data-toggle":"modal", style: "" + (ctrl.isLoggedInBool() == true ? "display: none;" : "")}, [
                    m("i.glyphicon.glyphicon-plus")
                ], " Create Account")
            ])
        ])
    ])
};
jumbotron.controller = function() {
    var me = {};
    me.isLoggedInBool = function() {
        var c = cookies.getCookie("session");
        return c !== false;
    };
    return me;
};
