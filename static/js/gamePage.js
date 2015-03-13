var gamePage = {};

gamePage.view = function() {

    var gameUrl = m.route.param("gameTitle");
    var gamePositionInJsonFile = 0;
    for(var i = 0; i < games().length; i++) {
        if(inputValidation.replaceSpacesWithUnderscores(games()[i].title) == gameUrl) {
            gamePositionInJsonFile = i;
        }
    }
    var gameInfo = games()[gamePositionInJsonFile];
    var ratio = gameInfo.height / gameInfo.width;
    var width = $(window).width() - 50;
    var height = width * ratio;

    if(gameInfo.width > $(window).width()) {
        ratio = gameInfo.height / gameInfo.width;
        width = $(window).width() - 50;
        height = height * ratio;
    }

    //if(gameInfo.height > $(window).height()) {
    //ratio = gameInfo.height / gameInfo.width;
    //height = $(window).height - 100;
    //width = height * ratio;
    //
    //}

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