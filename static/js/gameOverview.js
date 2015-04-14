var gameOverview = {};

gameOverview.view = function(ctrl) {
    return [
        (m.route().indexOf("favoriteGames") > -1)
            ?
            m("center", [
                m("h1", "Your Favorite Games")
            ])
             :
            m(""),
        m("#homePageGridContainer.container", [
            m("select.form-control", {style: "width: 15em;", onchange: _.compose(m.withAttr("value", gameOverview.sortBy), gameThumbnail.resetViews, ctrl.reroute), value: gameOverview.sortBy()}, [
                m("option", "Most Played"),
                m("option", "Alphabetically")
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
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(1), href: "/page/" + ctrl.pageNumberToDisplay(1), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(1))]),
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(2), href: "/page/" + ctrl.pageNumberToDisplay(2), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(2))]),
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(3), href: "/page/" + ctrl.pageNumberToDisplay(3), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(3))]),
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(4), href: "/page/" + ctrl.pageNumberToDisplay(4), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(4))]),
                                m("li", [m("a", {style: ctrl.highlightCurrentPage(5), href: "/page/" + ctrl.pageNumberToDisplay(5), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(5))]),
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
    ];
};

gameOverview.sortBy = m.prop("Most Played");

gameOverview.controller = function() {
    var me = {};
    me.reroute = function() {
        m.route("#/page/1");
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
