var gamePage = {};

gamePage.view = function() {

    var gameUrl = m.route.param("gameTitle");
    var gamePositionInJsonFile = 0;
    for (var i = 0; i < games().length; i++) {
        if (inputValidation.replaceSpacesWithUnderscores(games()[i].title) == gameUrl) {
            gamePositionInJsonFile = i;
        }
    }
    var gameInfo = games()[gamePositionInJsonFile];
    var ratio = gameInfo.height / gameInfo.width;
    var width = $(window).width() * .95;
    var height = width * ratio;

    //reminder: when some games are scaled up in size, they leave a gray border and don't scale.
    //afaik, there is no way to tell if the game is scalable or not.
    if(height > $(window).height() * .95) {
        for(i = 1; height > $(window).height() * .90;) {
            height -= i;
        }
        width = height / ratio;
    }

    return m("div", [
        m("center", [
            m("embed", {src: gameInfo.flash_file.replace("http", "https"), width: width + ";", height:  height + ";"})
        ])
    ]);
};

gamePage.controller = function() {
    var me = {};
    return me;
};