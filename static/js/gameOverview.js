var gameOverview = {};

gameOverview.view = function(ctrl) {
    return m("#homePageGridContainer.container", [
        m("select.form-control", {style: "width: 15em;"}, [
            m("option", "Featured"),
            m("option", "Most Played"),
            m("option", "Newest"),
            m("option", "Alphabetical")
        ]),
        m(".row", {style: "margin-top: 10px;"}, _.times(4, gameThumbnail.view)),
        m(".row", {style: "margin-top: 10px;"}, _.times(4, gameThumbnail.view)),
        m(".row", {style: "margin-top: 10px;"}, _.times(4, gameThumbnail.view)),
        m("center", [
            m(".row", [
                m("nav", [
                    m("ul.pagination", [
                        m("li", [
                            m("a", {href: "#", "aria-label": "Previous"}, [
                                m("span", {"aria-hidden": "true"}, "«")
                            ])
                        ]),
                        m("li", [m("a", {href: "#", config: m.route}, "1")]),
                        m("li", [m("a", {href: "#", config: m.route}, "2")]),
                        m("li", [m("a", {href: "#", config: m.route}, "3")]),
                        m("li", [m("a", {href: "#", config: m.route}, "4")]),
                        m("li", [m("a", {href: "#", config: m.route}, "5")]),
                        m("li", [
                            m("a", {href: "#", "aria-label": "Next"}, [
                                m("span", {"aria-hidden": "true"}, "»")
                            ])
                        ])
                    ])
                ])
            ])
        ])
    ]);
};

gameOverview.controller = function() {
    var me = {};
    me.getGamesJson = function(){
        return $.getJSON("/static/games.json");
    };

    me.sortAlphabetical = function() {
        console.log(JSON.parse(JSON.stringify(me.getGamesJson())));
        //sort.sortJsonArrayByProperty(me.getGamesJson(), "title", -1);
    };

    me.sortAlphabetical();
};
