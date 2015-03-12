//init
var colors = helpers.colors();
var inputValidation = helpers.inputValidation();
var sorting = helpers.sort();

//init controllers
var registerModalCtrl = registerModal.controller();
var loginModalCtrl = loginModal.controller();
var gameOverviewCtrl = gameOverview.controller();
var gameThumbnailCtrl = gameThumbnail.controller();

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


var gamePageLayout = {};
gamePageLayout.view = function() {
	return m("div", [
		m("div", navbar.view()),
		m("div", gamePage.view()),
		m("div", loginModal.view(loginModalCtrl)),
		m("div", registerModal.view(registerModalCtrl)),
		m("div", contactModal.view()),
		m("div", footer.view())
	])
};
gamePageLayout.controller = function() {};


m.route.mode = "hash";
m.route(document.body, "/", {
	"/":homepage,
	"/game/:gameTitle": gamePageLayout
});
