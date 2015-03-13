var gameOverview = {};

gameOverview.view = function(ctrl) {
    return m("#homePageGridContainer.container", [
        m("select.form-control", {style: "width: 15em;", onchange: _.compose(m.withAttr("value", gameOverview.sortBy), gameThumbnail.resetViews), value: gameOverview.sortBy()}, [
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
                            m("li", [m("a", {href: "/page/1", onclick: gameThumbnail.resetViews(), config: m.route}, "1")]),
                            m("li", [m("a", {href: "/page/2", onclick: gameThumbnail.resetViews(), config: m.route}, "2")]),
                            m("li", [m("a", {href: "/page/3", onclick: gameThumbnail.resetViews(), config: m.route}, "3")]),
                            m("li", [m("a", {href: "/page/4", onclick: gameThumbnail.resetViews(), config: m.route}, "4")]),
                            m("li", [m("a", {href: "/page/5", onclick: gameThumbnail.resetViews(), config: m.route}, "5")]),
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
    return me;
};
