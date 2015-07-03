var jumbotron = {};

jumbotron.view = function(ctrl) {
    return m(".container", [
        m(".jumbotron", [
            m("center", [
                m("h1", "Quack!~"),
                m("p", "Welcome to LittleDucklingGames.com."),
                m("a", {class:"btn btn-default", href:"#loginModal", "data-toggle":"modal", style: "margin-right:10px;" + (ctrl.isLoggedInBool() == true ? "display: none;" : "")}, "Login"),
                m("a", {class:"btn btn-primary", href:"#registerModal", "data-toggle":"modal", style: "" + (ctrl.isLoggedInBool() == true ? "display: none;" : "")}, "Create Account")
            ])//end center
        ])//end jumbotron
    ])//end container
};//end
jumbotron.controller = function() {
    var me = {};
    me.isLoggedInBool = function() {
        var c = cookies.getCookie("session");
        return c !== false;
    };
    return me;
};
