var gamePage = {};

gamePage.view = function(ctrl) {

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
        while(height > $(window).height() * .90) {
            height -= 1;
        }
        width = height / ratio;
    }


    return m("div", [
        m("center", [
            m("embed", {src: gameInfo.flash_file.replace("http", "https"), width: width + ";", height:  height + ";"}),
        ]),
        m(".container-fluid", {style: "width:" + width + "px;"},  [
            m(".form-group", {onclick: ctrl.favorite}, [
                m("a.btn.btn-primary", [
                    m("h5", "+ Favorite  ", m("span", {class: ctrl.favoriteClass(), "aria-hidden": "true"/*, style: "margin-left:" + ($(window).width() - width)/2 + "px;"*/}))
                ])
            ])
        ])
    ]);
};

gamePage.controller = function() {
    var me = {};
    me.favoriteClass = m.prop("glyphicon glyphicon-star-empty");
    me.favorite = function() {
        if(me.favoriteClass() == "glyphicon glyphicon-star-empty") {
            me.favoriteClass("glyphicon glyphicon-star");
        } else {
            me.favoriteClass("glyphicon glyphicon-star-empty");
        }
    };
    //me.favoriteGame = m.request();
    return me;
};