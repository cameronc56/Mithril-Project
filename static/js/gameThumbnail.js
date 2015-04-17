var gameThumbnail = {};
gameThumbnail.viewsOnPage = m.prop(0);
gameThumbnail.resetViews = function() {
    gameThumbnail.viewsOnPage(0);
};
gameThumbnail.view = function(ctrl) {
    var gameInfo = [];
    var title = "";
    var thumbnail = "";
    if(m.route().indexOf("favoriteGames") > -1) {
        var maxGameThumbnails = ctrl.favoriteGamesArray().length;
        if(gameThumbnail.viewsOnPage() <= maxGameThumbnails - 1) {
            for(var j = gameThumbnail.viewsOnPage(); j < maxGameThumbnails; j++) {
                for(var i = 0; i < ctrl.games().length; i++) {
                    if(ctrl.favoriteGamesArray()[j][0] == inputValidation.replaceSpacesWithUnderscores(ctrl.games()[i].title)) {
                        gameInfo = ctrl.games()[i];
                        title = gameInfo.title;
                        thumbnail = gameInfo.thumbnail;
                        gameThumbnail.viewsOnPage(gameThumbnail.viewsOnPage() + 1);
                        return m(".col-sm-3", [
                            m("p", title),
                            m("a", {href: "#/game/" + inputValidation.replaceSpacesWithUnderscores(title)}, [
                                m("img.img-rounded.img-responsive", {src: thumbnail, alt: title})
                            ]),
                            m("br")
                        ])
                    }
                }
            }
        }
    } else {
        var selectValue = gameOverview.sortBy();
        if(selectValue == "Most Played") {
            selectValue = "gameplays";
        } else if(selectValue == "Alphabetically") {
            selectValue = "title";
        }
        gameInfo = ctrl.games().sort(sorting.sortByProperty(selectValue))[gameThumbnail.viewsOnPage() + (parseInt(m.route.param("pageNumber") - 1) * 12)];
        if(gameInfo != undefined) {
            title = gameInfo.title;
            thumbnail = gameInfo.thumbnail;
            gameThumbnail.viewsOnPage(gameThumbnail.viewsOnPage() + 1);
            return m(".col-sm-3", [
                m("p", title),
                m("a", {href: "#/game/" + inputValidation.replaceSpacesWithUnderscores(title)}, [
                    m("img.img-rounded.img-responsive", {src: thumbnail, alt: title})
                ]),
                m("br")
            ])
        }

    }
    gameThumbnail.viewsOnPage(gameThumbnail.viewsOnPage() + 1);
    return m("div");
};

gameThumbnail.controller = function() {
    var me = {};
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

    me.username = m.prop("Username");
    cookies.checkSession(function(response) {
        me.username(response.username);
        me.getFavoriteGames();
    });

    me.favoriteGamesArray = m.prop([]);
    me.getFavoriteGames = function() {
        m.request({
            method: "POST",
            url: "/getAllFavoriteGames",
            data: {"username": me.username()}
        }).then(function(response) {
            me.favoriteGamesArray(response.favoriteGames);
        })
    };
    return me;
};

//global array of games objects
//game object attributes:
//category
//description
//developer_name
//featured_image
//flash_file
//gameplays
//height
//id
//instructions
//launch_date
//rating
//screenshot
//thumbnail
//title
//url
//width