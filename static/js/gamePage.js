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
    return [
        m(".container", [
           m(".row", [
               m(".span", [
                   m(".alert.alert-danger.alert-dismissible", {role: "alert", style: ctrl.showError()}, [
                       m("button.close", {"data-dismiss": "alert", "aria-label": "Close"}, [
                           m("span", {"aria-hidden": "true"}, "×")
                       ]),
                       m("", "Please login to favorite this game")
                   ])
               ])
           ])
        ]),
        m("center", [
            m("embed", {src: gameInfo.flash_file.replace("http", "https"), width: width + ";", height:  height + ";"})
        ]),
        m(".container-fluid", {style: "width:" + width * 1.035 + "px;"},  [
            m(".form-group", {onclick: ctrl.favorite}, [
                m("a.btn.btn-primary", [
                    m("h5", "+ Favorite  ", m("span", {class: ctrl.favoriteClass(), "aria-hidden": "true"}))
                ])
            ])
        ])
    ];
};

//<div class="alert alert-warning alert-dismissible" role="alert">
//  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//  <strong>Warning!</strong> Better check yourself, you're not looking too good.
//</div>

gamePage.controller = function() {
    var me = {};

    me.username = m.prop("Username");
    cookies.checkSession(function(response) {
        me.username(response.username);
        me.isFavorite();
    });
    me.favoriteClass = m.prop();

    me.isFavorite = function() {
        if(m.route.param("gameTitle") != undefined) {
            if(cookies.getCookie("session") != "") {
                m.request({
                    method: "POST",
                    url: "/isFavoriteGame",
                    data: {"username": me.username(), "gameTitle": m.route.param("gameTitle")}
                }).then(function (response) {
                    if (response.isFavorite == "true") {
                        console.log("true");
                        me.favoriteClass("glyphicon glyphicon-star");
                    } else if (response.isFavorite == "false") {
                        console.log("false");
                        me.favoriteClass("glyphicon glyphicon-star-empty");
                    }
                })
            }
        }
    };

    me.showError = m.prop("display: none;");

    me.favorite = function() {
        if(cookies.getCookie("session") != "") {
            m.request({
                method: "POST",
                url: "/favoriteGame",
                data: {"username": me.username(), "gameTitle": m.route.param("gameTitle")}
            }).then(function (response) {
                if (me.favoriteClass() == "glyphicon glyphicon-star-empty") {
                    me.favoriteClass("glyphicon glyphicon-star");
                } else {
                    me.favoriteClass("glyphicon glyphicon-star-empty");
                }
            });
        } else if(cookies.getCookie("session") == "") {
            me.showError("display: '';");
        }
    };
    return me;
};
