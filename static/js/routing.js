//init
var colors = helpers.colors();
var inputValidation = helpers.inputValidation();
var sorting = helpers.sort();
var cookies = helpers.cookies();

//init controllers
var registerModalCtrl = registerModal.controller();
var loginModalCtrl = loginModal.controller();
var gameOverviewCtrl = gameOverview.controller();
var gameThumbnailCtrl = gameThumbnail.controller();
var accountPageCtrl = accountPage.controller();
var jumbotronCtrl = jumbotron.controller();
var navbarCtrl = navbar.controller();

var homepage = {};
homepage.view = function() {
	return m("div", [
		m("div", navbar.view(navbarCtrl)),
		m("div", jumbotron.view(jumbotronCtrl)),
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
		m("div", navbar.view(navbarCtrl)),
		m("div", gamePage.view()),
		m("div", loginModal.view(loginModalCtrl)),
		m("div", registerModal.view(registerModalCtrl)),
		m("div", contactModal.view()),
		m("div", footer.view())
	])
};
gamePageLayout.controller = function() {};

var accountPageLayout = {};
accountPageLayout.view = function() {
	return m("div", [
		m("div", navbar.view(navbarCtrl)),
		m("div", accountPage.view(accountPageCtrl)),
		m("div", loginModal.view(loginModalCtrl)),
		m("div", registerModal.view(registerModalCtrl)),
		m("div", contactModal.view()),
		m("div", footer.view())
	])
};
accountPageLayout.controller = function() {};



m.route.mode = "hash";
m.route(document.body, "/page/1", {
	"/page/:pageNumber":homepage,
	"/game/:gameTitle": gamePageLayout,
	"/account/:username": accountPageLayout
});
