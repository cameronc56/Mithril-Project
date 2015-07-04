//init
var colors = helpers.colors();
var inputValidation = helpers.inputValidation();
var sorting = helpers.sort();
var cookies = helpers.cookies();
var routing = helpers.routing();

var loginpage = {};
loginpage.view = function() {
    return [
        m.component(adminNavbar)
    ]
};
loginpage.controller = function() {};


var homepage = {};
homepage.view = function(ctrl) {
    if(ctrl.username() != "") {
        return [
            m("p", "homepage")
        ]
    } else {
        m.route("#/");
        document.location.reload();
    }
};
homepage.controller = function() {
    var me = {};
    me.username = m.prop("");
    me.isLoggedIn = function() {
        cookies.checkSession(function(response) {
            console.log(response);
            me.username(response.username);
        });
    };
    me.isLoggedIn();
    return me;
};


m.route.mode = "hash";
m.route(document.body, "/", {
    "/":loginpage,
    "/admin":homepage
});