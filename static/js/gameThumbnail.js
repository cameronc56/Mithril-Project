var gameThumbnail = {};
gameThumbnail.viewsOnPage = m.prop(0);
gameThumbnail.resetViews = function() {
    gameThumbnail.viewsOnPage(0);
};
gameThumbnail.view = function() {
    var selectValue = gameOverview.sortBy();
    if(selectValue == "Most Played") {
        selectValue = "gameplays";
    } else if(selectValue == "Alphabetically") {
        selectValue = "title";
    }
    var gameInfo = games().sort(sorting.sortByProperty(selectValue))[gameThumbnail.viewsOnPage() + (parseInt(m.route.param("pageNumber") - 1) * 12)];
    var title = gameInfo.title;
    var thumbnail = gameInfo.thumbnail;
    gameThumbnail.viewsOnPage(gameThumbnail.viewsOnPage() + 1);
    return m(".col-sm-3", [
        m("p", title),
        m("a", {href: "#/game/" + inputValidation.replaceSpacesWithUnderscores(title)}, [
            m("img.img-rounded.img-responsive", {src: thumbnail, alt: title})
        ]),
        m("br")
    ])
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
var games = m.prop([]);

gameThumbnail.controller = function() {
    m.request({method: "GET", url: "/static/games.json"}).then(function(val) {
        games(val);
    });
};