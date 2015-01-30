var homepage = {};
homepage.view = function (ctrl) {
	return m("div", [
		m("div", navbar.view()),
		m("div", jumbotron.view())
	])
};
homepage.controller = function() {};


m.route.mode = "hash";
m.route(document.body, "/navbar", {
	"/homepage":homepage,
    "/navbar":navbar,
    "/jumbotron":jumbotron
});