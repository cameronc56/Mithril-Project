var gameOverview = {};

gameOverview.view = function(ctrl) {
    return m("#homePageGridContainer.container", [
            ctrl.isFavoritesPage()
                ? m("center", [m("h1", "Your Favorite Games")])
                : "",
            //!ctrl.isFavoritesPage()
                m(".row", {style: "margin-bottom: 20px;"}, [
                    m("select.form-control.pull-left", {style: "width: 16em; margin-left: 30px;", onchange: _.compose(m.withAttr("value", gameOverview.sortBy)/*routing.reroute*/), value: gameOverview.sortBy()}, [
                        m("option", "Most Played"),
                        m("option", "Alphabetically")
                    ]),
                    m(".input-group.pull-right", {style: "margin-right: 45px;"}, [
                        m("input#search.form-control", {onkeyup: m.withAttr("value", ctrl.searchValue), placeholder: "Search", type: "text", style: "width: 180px;", value: ctrl.searchValue()}),
                        m(".input-group-btn.pull-left", [
                            m("button.btn.btn-default", {onclick: ctrl.search}, [
                                m("span.glyphicon.glyphicon-search")
                            ])
                        ])
                    ])
                ]),

            m(".container", [
                (function() {
                    //default values
                    var view = m.prop("");
                    var rows = m.prop(3);
                    var columns = m.prop(4);
                    ctrl.isFavoritesPage() ? view("favorites") : view("homepage");
                    //gets the number of favorite games rows to display
                    ctrl.isFavoritesPage() ? rows(parseInt((ctrl.favoriteGamesJSON().length / columns()) + Math.ceil((ctrl.favoriteGamesJSON().length % columns()) / columns() ))) : "";

                    ctrl.sortFavoriteGames(ctrl.games(), ctrl.favoriteGamesJSON());
                    ctrl.sortAllGames(ctrl.games());

                    return _.times(rows(), function(i) {
                        return m(".row", {style: "margin-top: 0px;"}, _.times(4, function(j) {
                            ctrl.thumbnailNumber(4 * (i + 1) + j - 4);
                            return m.component(gameThumbnail, {
                                view: view(),
                                thumbnailNumber: ctrl.thumbnailNumber(),
                                gameInfo: function() {
                                    if(ctrl.isFavoritesPage()) {
                                        //ctrl.favoriteGameInfo(ctrl.games(), ctrl.favoriteGames(), ctrl.thumbnailNumber());
                                        return ctrl.sortedFavoriteGames()[ctrl.thumbnailNumber() + (parseInt(m.route.param("pageNumber") - 1) * 12)];
                                    } else {
                                        //return ctrl.homepageGameInfo(ctrl.games(), ctrl.thumbnailNumber());
                                        return ctrl.sortedAllGames()[ctrl.thumbnailNumber() + (parseInt(m.route.param("pageNumber") - 1) * 12)];
                                    }
                                }()
                            })
                        }))
                    });
                })()
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
            url: "/static/json/games.json"
        }).then(function(val) {
            me.games(val);
        });
    };
    me.getGamesJson();

    me.favoriteGamesJSON = m.prop([]);
    me.favoriteGamesPages = m.prop(1);
    me.getFavoriteGames = function() {
        m.request({
            method: "POST",
            url: "/getAllFavoriteGames",
            data: {"username": me.username()}
        }).then(function(response) {
            me.favoriteGamesJSON(response.favoriteGames);
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


    me.searchValue = m.prop("");
    me.searchedValue = m.prop("");
    me.search = function() {
        me.searchedValue(me.searchValue());
        console.log(me.searchedValue());
        m.redraw();
    };


    me.thumbnailNumber = m.prop(0);
    me.sortedFavoriteGames = m.prop([]);
    me.sortFavoriteGames = function(games, favoriteGames) {
        me.sortedFavoriteGames([]);
        //matches favorite games from database to games in games file
        var maxGameThumbnails = favoriteGames.length;
        //if(thumbnailNumber <= maxGameThumbnails - 1) {
            for(var j = 0; j < maxGameThumbnails; j++) {
                for(var i = 0; i < games.length; i++) {
                    if(favoriteGames[j][0] == inputValidation.replaceSpacesWithUnderscores(games[i].title)) {
                        me.sortedFavoriteGames().push(games[i]);
                    }
                }
            }
        //}
        //sorting
        var selectValue = m.prop("gameplays");
        if(gameOverview.sortBy() == "Alphabetically") selectValue("title");
        me.sortedFavoriteGames().sort(sorting.sortByProperty(selectValue()));
    };


    me.sortedAllGames = m.prop([]);
    me.sortAllGames = function(games) {
        me.sortedAllGames([]);
        //sorting
        var selectValue = m.prop("gameplays");
        if(gameOverview.sortBy() == "Alphabetically") selectValue("title");
        me.sortedAllGames(games.sort(sorting.sortByProperty(selectValue())));
    };

    return me;
};
