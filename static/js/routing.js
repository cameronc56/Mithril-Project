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
	contactModalCtrl = contactModal.controller();
};

var homepage = {};
homepage.view = function() {
	return [
		navbar.view(navbarCtrl),
		jumbotron.view(jumbotronCtrl),
		gameOverview.view(gameOverviewCtrl),
		loginModal.view(loginModalCtrl),
		registerModal.view(registerModalCtrl),
		contactModal.view(contactModalCtrl),
		footer.view()
	]
};
homepage.controller = function() {
	initControllers();
};

var gamePageLayout = {};
gamePageLayout.view = function() {
	return [
		navbar.view(navbarCtrl),
		gamePage.view(gamePageCtrl),
		loginModal.view(loginModalCtrl),
		registerModal.view(registerModalCtrl),
		contactModal.view(contactModalCtrl),
		footer.view()
	]
};
gamePageLayout.controller = function() {
	initControllers();
};

var favoriteGamesLayout = {};
favoriteGamesLayout.view = function() {
	return [
		navbar.view(navbarCtrl),
		gameOverview.view(gameOverviewCtrl),
		loginModal.view(loginModalCtrl),
		registerModal.view(registerModalCtrl),
		contactModal.view(contactModalCtrl),
		footer.view()
	]
};
favoriteGamesLayout.controller = function() {
	initControllers()
};

var accountPageLayout = {};
accountPageLayout.view = function() {
	console.log(m.route());
	return [
		navbar.view(navbarCtrl),
		accountPage.view(accountPageCtrl),
		loginModal.view(loginModalCtrl),
		registerModal.view(registerModalCtrl),
		contactModal.view(contactModalCtrl),
		footer.view()
	]
};
accountPageLayout.controller = function() {
	initControllers();
};

m.route.mode = "hash";
m.route(document.body, "/page/1", {
	"/page/:pageNumber":homepage,
	"/game/:gameTitle": gamePageLayout,
	"/account/:username": accountPageLayout,
	"/favoriteGames/page/:pageNumber": favoriteGamesLayout
});