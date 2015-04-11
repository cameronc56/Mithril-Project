var favoriteGames = {};

favoriteGames.view = function(ctrl) {
    return [
        m("#homePageGridContainer.container", [
            m("center", [
                m("h1", "Your Favorite Games")
            ]),
            m(".container", [
                m(".row", {style: "margin-top: 10px;"}, _.times(4, function(){return gameThumbnail.view(gameThumbnailCtrl)})),
                m(".row", {style: "margin-top: 10px;"}, _.times(4, function(){return gameThumbnail.view(gameThumbnailCtrl)})),
                m(".row", {style: "margin-top: 10px;"}, _.times(4, function(){return gameThumbnail.view(gameThumbnailCtrl)})),
                m("center", [
                    m(".row", [
                        m("nav", [
                            m("ul.pagination", [
                                m("li", [
                                    m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) - 1), "aria-label": "Previous", config: m.route}, [
                                        m("span", {"aria-hidden": "true"}, "«")
                                    ])
                                ]),
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(1), href: "/favoriteGames/page/" + ctrl.pageNumberToDisplay(1), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(1))]),
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(2), href: "/favoriteGames/page/" + ctrl.pageNumberToDisplay(2), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(2))]),
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(3), href: "/favoriteGames/page/" + ctrl.pageNumberToDisplay(3), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(3))]),
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(4), href: "/favoriteGames/page/" + ctrl.pageNumberToDisplay(4), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(4))]),
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(5), href: "/favoriteGames/page/" + ctrl.pageNumberToDisplay(5), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(5))]),
                                m("li", [
                                    m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) + 1), "aria-label": "Next", config: m.route}, [
                                        m("span", {"aria-hidden": "true"}, "»")
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ])
    ]
};

favoriteGames.sortBy = m.prop("Most Played");


favoriteGames.controller = function() {
    var me = {};
    me.reroute = function() {
        m.route("#/favoriteGames/page/1");
    };
    me.highlightCurrentPage = function(i) {
        if(parseInt(me.pageNumberToDisplay(i)) == parseInt(m.route.param("pageNumber"))) {
            return "color: black;"
        }
    };
    me.pageNumberToDisplay = function(i) {
        if (m.route.param("pageNumber") > 3) {
            return (parseInt(m.route.param("pageNumber")) + i - 3).toString();
        } else  {
            return (i).toString();
        }
    };
    return me;
};