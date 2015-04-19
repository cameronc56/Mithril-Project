//init
var colors = helpers.colors();
var inputValidation = helpers.inputValidation();
var sorting = helpers.sort();
var cookies = helpers.cookies();
var routing = helpers.routing();

var homepage = {};
homepage.view = function() {
	return [
		navbar,
		jumbotron,
		gameOverview,
		loginModal,
		registerModal,
		contactModal,
		footer
	]
};
homepage.controller = function() {};

var gamePageLayout = {};
gamePageLayout.view = function() {
	return [
		navbar,
		gamePage,
		loginModal,
		registerModal,
		contactModal,
		footer
	]
};
gamePageLayout.controller = function() {};

var favoriteGamesLayout = {};
favoriteGamesLayout.view = function() {
	return [
		navbar,
		gameOverview,
		loginModal,
		registerModal,
		contactModal,
		footer
	]
};
favoriteGamesLayout.controller = function() {};

var accountPageLayout = {};
accountPageLayout.view = function() {
	return [
		navbar,
		accountPage,
		loginModal,
		registerModal,
		contactModal,
		footer
	]
};
accountPageLayout.controller = function() {};

var forumPageLayout = {};
forumPageLayout.view = function() {
	return [
		navbar,
		loginModal,
		registerModal,
		contactModal,
		forum,
		footer
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