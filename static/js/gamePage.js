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
            m("embed", {src: gameInfo.flash_file.replace("http", "https"), width: width + ";", height:  height + ";"})
        ]),
        m(".container-fluid", {style: "width:" + width + "px;"},  [
            m(".form-group", {onclick: ctrl.favorite}, [
                m("a.btn.btn-primary", [
                    m("h5", "+ Favorite  ", m("span", {class: ctrl.favoriteClass(), "aria-hidden": "true"}))
                ])
            ])
        ])
    ]);
};

gamePage.controller = function() {
    var me = {};

    me.username = m.prop("Username");
    cookies.checkSession(function(response){me.username(response.username)});
    me.favoriteClass = m.prop("glyphicon glyphicon-star-empty");

    me.isFavorite = function() {
        if(cookies.getCookie("session") != "") {
            m.request({
                method: "POST",
                url: "/isFavoriteGame",
                data: {"username": me.username(), "gameTitle": m.route.param("gameTitle")}
            }).then(function (response) {
                console.log("isFavorite");
                if (response.isFavorite == "True") {
                    me.favoriteClass("glyphicon glyphicon-star");
                } else if (response.isFavorite == "False") {
                    me.favoriteClass("glyphicon glyphicon-star-empty");
                }
            })
        }
    };

    me.favorite = function() {
        if(cookies.getCookie("session") != "") {
            if (me.favoriteClass() == "glyphicon glyphicon-star-empty") {
                me.favoriteClass("glyphicon glyphicon-star");
            } else {
                me.favoriteClass("glyphicon glyphicon-star-empty");
            }
            m.request({
                method: "POST",
                url: "/favoriteGame",
                data: {"username": me.username(), "gameTitle": m.route.param("gameTitle")}
            }).then(function (response) {

            });
        } else if(cookies.getCookie("session") == "") {
            alert("Please login to favorite this game");
        }
    };
    return me;
};
