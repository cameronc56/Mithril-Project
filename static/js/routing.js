var homepage = {};
homepage.view = function (ctrl) {
	return m("div", [
		m("div", navbar.view()),
		m("div", jumbotron.view()),
		m("div", gameOverview.view())
	])
};
homepage.controller = function() {};


m.route.mode = "hash";
m.route(document.body, "/", {
	"/":homepage,
    "/navbar":navbar,
    "/jumbotron":jumbotron,
	"/gameOverview":gameOverview
});

