var gameOverview = {};

gameOverview.view = function(ctrl) {
    var displayPageNumber = function(i) {
        return m("li", {class: ctrl.highlightCurrentPage(i)}, [
            m("a", {href: "/page/" + ctrl.pageNumberToDisplay(i), /* onclick: gameThumbnail.resetViews(), */ config: m.route}, ctrl.pageNumberToDisplay(i))
        ]);
    };
    return m("#homePageGridContainer.container", [
            ctrl.isFavoritesPage()
                ? m("center", [m("h1", "Your Favorite Games")])
                : "",
            !ctrl.isFavoritesPage()
                ? m(".row", [
                    m("select.form-control.pull-left", {style: "width: 14em;", onchange: _.compose(m.withAttr("value", gameOverview.sortBy), /*gameThumbnail.resetViews, */ routing.reroute), value: gameOverview.sortBy()}, [
                        m("option", "Most Played"),
                        m("option", "Alphabetically")
                    ]),
                    m("div.form-group.pull-right", [
                        m("input#search.form-control", {onkeyup: m.withAttr("value", ctrl.searchValue), type: "text", placeholder: "Search", style: "width: 15em;"}, ctrl.searchValue())
                    ])
                ])
                : "",
            m(".container", [
                (function() {
                    //default values
                    var view = m.prop("");
                    var rows = m.prop(3);
                    var columns = m.prop(4);
                    ctrl.isFavoritesPage() ? view("favorites") : view("homepage");
                    //gets the number of favorite games rows to display
                    ctrl.isFavoritesPage() ? rows(parseInt((ctrl.favoriteGames().length / columns()) + Math.ceil((ctrl.favoriteGames().length % columns()) / columns() ))) : "";
                    return _.times(rows(), function(i) {
                        return m(".row", {style: "margin-top: 10px;"}, _.times(4, function(j) {
                            ctrl.thumbnailNumber(4 * (i + 1) + j - 4);
                            return m.component(gameThumbnail, {
                                view: view(),
                                thumbnailNumber: ctrl.thumbnailNumber(),
                                gameInfo: function() {
                                    if(ctrl.isFavoritesPage()) {
                                        return ctrl.favoriteGameInfo(ctrl.games(), ctrl.favoriteGames(), ctrl.thumbnailNumber())
                                    } else {
                                        return ctrl.homepageGameInfo(ctrl.games(), ctrl.thumbnailNumber())
                                    }
                                }()
                            })
                        }))
                    });
                })(),
                m("center", [
                    m(".row", [
                        m("nav", [
                            !ctrl.isFavoritesPage() ?
                                m("ul.pagination", [
                                    m("li", [
                                        m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) - 1), "aria-label": "Previous", config: m.route}, [
                                            m("span", {"aria-hidden": "true"}, "«")
                                        ])
                                    ]),
                                    _.times(5, displayPageNumber),
                                    m("li", [
                                        m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) + 1), "aria-label": "Next", config: m.route}, [
                                            m("span", {"aria-hidden": "true"}, "»")
                                        ])
                                    ])
                                ])
                            : ""
                        ])
                    ])
                ])
            ])
        ]);
};

//global used by navbar, gameOverview and gameThumbnail
gameOverview.sortBy = m.prop("Most Played");

gameOverview.controller = function() {
    var me = {};

    me.isFavoritesPage = m.prop(m.route().indexOf("favoriteGames") > -1);

    me.games = m.prop([]);
    me.getGamesJson = function() {
        m.request({
            method: "GET",
            url: "/static/games.json"
        }).then(function(val) {
            me.games(val);
        });
    };
    me.getGamesJson();

    me.favoriteGames = m.prop([]);
    me.favoriteGamesPages = m.prop(1);
    me.getFavoriteGames = function() {
        m.request({
            method: "POST",
            url: "/getAllFavoriteGames",
            data: {"username": me.username()}
        }).then(function(response) {
            me.favoriteGames(response.favoriteGames);
            //parseInt rounds down
            me.favoriteGamesPages(parseInt(response.favoriteGames.length / 12 + 1));
        })
    };

    me.username = m.prop("Account");
    if(me.isFavoritesPage()) {
        cookies.checkSession(function (response) {
            me.username(response.username);
            me.getFavoriteGames();
        });
    }

    me.thumbnailNumber = m.prop(0);

    me.favoriteGameInfo = function(games, favoriteGames, thumbnailNumber) {
        var maxGameThumbnails = favoriteGames.length;
        if(thumbnailNumber <= maxGameThumbnails - 1) {
            for(var j = thumbnailNumber; j < maxGameThumbnails; j++) {
                for(var i = 0; i < games.length; i++) {
                    if(favoriteGames[j][0] == inputValidation.replaceSpacesWithUnderscores(games[i].title)) {
                        return games[i];
                    }
                }
            }
        }
    };

    me.searchValue = m.prop();
    me.search = function() {

    };

    me.homepageGameInfo = function(games, thumbnailNumber) {
        //Most Played = gameplays -  Alphabetically = title
        var selectValue = m.prop("gameplays");
        if(gameOverview.sortBy() == "Alphabetically") selectValue("title");
        var game = games.sort(sorting.sortByProperty(selectValue()))[thumbnailNumber + (parseInt(m.route.param("pageNumber") - 1) * 12)];
        //if(game == undefined) {
        //    //fallback for first render
        //    return {title: "", thumbnail: ""}
        //}
        return game;
    };

    //pagination stuff
    me.highlightCurrentPage = function(i) {
        if(parseInt(me.pageNumberToDisplay(i)) == parseInt(m.route.param("pageNumber"))) {
            return "active";
        }
    };
    me.pageNumberToDisplay = function(i) {
        if (m.route.param("pageNumber") > 3) {
            return (parseInt(m.route.param("pageNumber")) + i - 2).toString();
        } else {
            return (i + 1).toString();
        }
    };
    return me;
};
