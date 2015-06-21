//init
var colors = helpers.colors();
var inputValidation = helpers.inputValidation();
var sorting = helpers.sort();
var cookies = helpers.cookies();
var routing = helpers.routing();

var homepage = {};
homepage.view = function() {
	return [
		m.component(navbar),
		m.component(jumbotron),
		m.component(gameOverview),
		m.component(loginModal),
		m.component(registerModal),
		m.component(contactModal),
		m.component(pagination),
		m.component(footer)
	]
};
homepage.controller = function() {};

var gamePageLayout = {};
gamePageLayout.view = function() {
	return [
		m.component(navbar),
		m.component(gamePage),
		m.component(loginModal),
		m.component(registerModal),
		m.component(contactModal),
		m.component(footer)
	]
};
gamePageLayout.controller = function() {};

var favoriteGamesLayout = {};
favoriteGamesLayout.view = function() {
	return [
		m.component(navbar),
		m.component(gameOverview),
		m.component(loginModal),
		m.component(registerModal),
		m.component(contactModal),
		m.component(footer)
	]
};
favoriteGamesLayout.controller = function() {};

var accountPageLayout = {};
accountPageLayout.view = function() {
	return [
		m.component(navbar),
		m.component(accountPage),
		m.component(loginModal),
		m.component(registerModal),
		m.component(contactModal),
		m.component(footer)
	]
};
accountPageLayout.controller = function() {};

var forumPageLayout = {};
forumPageLayout.view = function() {
	return [
		m.component(navbar),
		m.component(loginModal),
		m.component(registerModal),
		m.component(contactModal),
		m.component(forum),
		m.component(footer)
	]
};
forumPageLayout.controller = function() {};

m.route.mode = "hash";
m.route(document.body, "/page/1", {
	"/page/:pageNumber":homepage,
	"/game/:gameTitle": gamePageLayout,
	"/account/:username": accountPageLayout,
	"/favoriteGames/page/:pageNumber": favoriteGamesLayout,
	"/forum/page/:pageNumber": forumPageLayout
});