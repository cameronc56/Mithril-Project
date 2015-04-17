var gameOverview = {};

gameOverview.view = function(ctrl) {
    //var i = 1;
    //while(i++ < 10) {
    //    console.log(i);
    //}
    var displayPageNumber = function(i) {
        return m("li", [m("a", {style: ctrl.highlightCurrentPage(i), href: "/page/" + ctrl.pageNumberToDisplay(i), onclick: gameThumbnail.resetViews(), config: m.route}, ctrl.pageNumberToDisplay(i))]);

    };
    return (m.route().indexOf("favoriteGames") > -1)
            ?
            m("center", [
                m("h1", "Your Favorite Games")
            ])
             :
            m(""),
        m("#homePageGridContainer.container", [
            m("select.form-control", {style: "width: 15em;", onchange: _.compose(m.withAttr("value", gameOverview.sortBy), /*gameThumbnail.resetViews, */ routing.reroute), value: gameOverview.sortBy()}, [
                m("option", "Most Played"),
                m("option", "Alphabetically")
            ]),
            m(".container", [
                m(".row", {style: "margin-top: 10px;"}, _.times(4, function(){return gameThumbnail})),
                m(".row", {style: "margin-top: 10px;"}, _.times(4, function(){return gameThumbnail})),
                m(".row", {style: "margin-top: 10px;"}, _.times(4, function(){return gameThumbnail})),
                m("center", [
                    m(".row", [
                        m("nav", [
                            gameThumbnail.viewsOnPage() >= 12 ?
                                m("ul.pagination", [
                                    m("li", [
                                        m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) - 1), "aria-label": "Previous", config: m.route}, [
                                            m("span", {"aria-hidden": "true"}, "«")
                                        ])
                                    ]),
                                    _.times(5, displayPageNumber),
                                    m("li", [
                                        m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) + 1), "aria-label": "Next", config: m.route}, [
                                            m("span", {"aria-hidden": "true"}, "»")
                                        ])
                                    ])
                                ])
                            : ''
                        ])
                    ])
                ])
            ])
        ]);
};

gameOverview.sortBy = m.prop("Most Played");

gameOverview.controller = function() {
    var me = {};
    me.highlightCurrentPage = function(i) {
        if(parseInt(me.pageNumberToDisplay(i)) == parseInt(m.route.param("pageNumber"))) {
            return "color: black;"
        }
    };
    me.pageNumberToDisplay = function(i) {
        if (m.route.param("pageNumber") > 3) {
            return (parseInt(m.route.param("pageNumber")) + i - 2).toString();
        } else {
            return (i + 1).toString();
        }
    };
    return me;
};
