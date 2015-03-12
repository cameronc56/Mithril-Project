var gameThumbnail = {};

gameThumbnail.viewsOnPage = 0;
gameThumbnail.view = function() {
    var gameInfo = games().sort(sorting.sortByProperty("title"))[gameThumbnail.viewsOnPage];
    var title = gameInfo.title;
    var thumbnail = gameInfo.thumbnail;
    gameThumbnail.viewsOnPage += 1;
    return m(".col-sm-3", [
        m("p", title),
        m("a", {href: "/game/" + inputValidation.replaceSpacesWithUnderscores(title), config: m.route}, [
            m("img.img-rounded.img-responsive", {src: thumbnail, alt: title})
        ]),
        m("br")
    ])
};

var games = m.prop([]);

gameThumbnail.controller = function() {
    m.request({method: "GET", url: "/static/games.json"}).then(function(val) {
        games(val);
    });
};

