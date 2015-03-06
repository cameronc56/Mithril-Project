//init
var colors = helpers.colors();
var inputValidation = helpers.inputValidation();
var sort = helpers.sort();

//init controllers
var registerModalCtrl = registerModal.controller();
var loginModalCtrl = loginModal.controller();
var gameOverviewCtrl = gameOverview.controller();

var homepage = {};
homepage.view = function () {
	return m("div", [
		m("div", navbar.view()),
		m("div", jumbotron.view()),
		m("div", gameOverview.view(gameOverviewCtrl)),
		m("div", loginModal.view(loginModalCtrl)),
		m("div", registerModal.view(registerModalCtrl)),
		m("div", contactModal.view()),
		m("div", footer.view())
	])
};
homepage.controller = function() {};

var navbarLayout = {};
navbarLayout.view = function() {
	return m("div", [
		m("div", navbar.view())
	])
};
navbarLayout.controller = function() {};

var jumbotronLayout = {};
jumbotronLayout.view = function() {
	return m("div", [
		m("div", jumbotron.view()),
		m("div", loginModal.view()),
		m("div", registerModal.view())
	])
};
jumbotronLayout.controller = function() {};

var gameOverviewLayout = {};
gameOverviewLayout.view = function() {
	return m("div", [
		m("div", navbar.view()),
		m("div", game.view()),
		m("div", loginModal.view()),
		m("div", registerModal.view()),
		m("div", contactModal.view()),
		m("div", footer.view())
	])
};
gameOverviewLayout.controller = function() {};

m.route.mode = "hash";
m.route(document.body, "/", {
	"/":homepage,
    "/navbar":navbarLayout,
    "/jumbotron":jumbotronLayout,
	"/gameOverview":gameOverviewLayout,
	"/jumbotron2": jumbotron
});
