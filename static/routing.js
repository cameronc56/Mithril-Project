var homepage = {};
homepage.view = function (ctrl) {
	return [
		m("div", navbar),
		m("div", jumbotron)
	]
};
homepage.controller = function() {};


m.route.mode = "hash";
m.route(document.body, "/navbar", {
	"/homepage":homepage,
    "/navbar":navbar,
    "/jumbotron":jumbotron
});