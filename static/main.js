var homepage = {}; //init namespace
homepage.vm = {}; //init view-model
homepage.controller = function() {};
homepage.view = function(ctrl, navbar, jumbotron) {
    return m(".layout", [
        m("navbar", navbar),
        m("jumbotron", jumbotron)
    ]);
};

m.route(document.getElementById("main"), "/", {
    "/navbar":navbar,
    "/jumbotron":jumbotron
});