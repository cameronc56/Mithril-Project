var gameOverview = {};

gameOverview.view = function(ctrl) {
    return m("#homePageGridContainer.container", [
        m("select.form-control", {style: "width: 15em;", onchange: _.compose(m.withAttr("value", gameOverview.sortBy), gameThumbnail.resetViews, ctrl.reroute), value: gameOverview.sortBy()}, [
            m("option", "Most Played"),
            m("option", "Alphabetically")
        ]),
        m(".container", [
            m(".row", {style: "margin-top: 10px;"}, _.times(4, gameThumbnail.view)),
            m(".row", {style: "margin-top: 10px;"}, _.times(4, gameThumbnail.view)),
            m(".row", {style: "margin-top: 10px;"}, _.times(4, gameThumbnail.view)),
            m("center", [
                m(".row", [
                    m("nav", [
                        m("ul.pagination", [
                            m("li", [
                                m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) - 1), "aria-label": "Previous", config: m.route}, [
                                    m("span", {"aria-hidden": "true"}, "«")
                                ])
                            ]),
                            m("li", [m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber"))).toString(), onclick: gameThumbnail.resetViews(), config: m.route}, (parseInt(m.route.param("pageNumber"))).toString())]),
                            m("li", [m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) + 1).toString(), onclick: gameThumbnail.resetViews(), config: m.route}, (parseInt(m.route.param("pageNumber")) + 1).toString())]),
                            m("li", [m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) + 2).toString(), onclick: gameThumbnail.resetViews(), config: m.route}, (parseInt(m.route.param("pageNumber")) + 2).toString())]),
                            m("li", [m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) + 3).toString(), onclick: gameThumbnail.resetViews(), config: m.route}, (parseInt(m.route.param("pageNumber")) + 3).toString())]),
                            m("li", [m("a", {href: "/page/" + (parseInt(m.route.param("pageNumber")) + 4).toString(), onclick: gameThumbnail.resetViews(), config: m.route}, (parseInt(m.route.param("pageNumber")) + 4).toString())]),
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
    ]);
};

gameOverview.sortBy = m.prop("Most Played");

gameOverview.controller = function() {
    var me = {};
    me.reroute = function() {
        m.route("#/page/1");
    }
    return me;
};
