//init
var colors = helpers.colors();
var inputValidation = helpers.inputValidation();
var sorting = helpers.sort();
var cookies = helpers.cookies();
var routing = helpers.routing();

var homepage = {};
homepage.view = function() {
    return [
        m.component(adminNavbar)
    ]
};
homepage.controller = function() {};


m.route.mode = "hash";
m.route(document.body, "/", {
    "/":homepage
});