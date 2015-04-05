//init
var colors = helpers.colors();
var inputValidation = helpers.inputValidation();
var sorting = helpers.sort();
var cookies = helpers.cookies();

initControllers = function() {
	//init controllers
	registerModalCtrl = registerModal.controller();
	loginModalCtrl = loginModal.controller();
	gameOverviewCtrl = gameOverview.controller();
	gameThumbnailCtrl = gameThumbnail.controller();
	accountPageCtrl = accountPage.controller();
	jumbotronCtrl = jumbotron.controller();
	navbarCtrl = navbar.controller();
	gamePageCtrl = gamePage.controller();
};

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
homepage.controller = function() {
	initControllers();
};


var gamePageLayout = {};
gamePageLayout.view = function() {
	return m("div", [
		m("div", navbar.view(navbarCtrl)),
		m("div", gamePage.view(gamePageCtrl)),
		m("div", loginModal.view(loginModalCtrl)),
		m("div", registerModal.view(registerModalCtrl)),
		m("div", contactModal.view()),
		m("div", footer.view())
	])
};
gamePageLayout.controller = function() {
	initControllers();
};

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
accountPageLayout.controller = function() {
	initControllers();
};

m.route.mode = "hash";
m.route(document.body, "/page/1", {
	"/page/:pageNumber":homepage,
	"/game/:gameTitle": gamePageLayout,
	"/account/:username": accountPageLayout
});
