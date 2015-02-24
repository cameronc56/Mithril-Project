var gameOverview = {};

gameOverview.view = function(ctrl) {
    return m("#homePageGridContainer.container", [
        m("select.form-control", {style: "width: 15em;"}, [
            m("option", "Featured"),
            m("option", "Most Played"),
            m("option", "Newest"),
            m("option", "Alphabetical")
        ]),
        m("#featured.row", {style: "margin-top: 10px;"}, [
            m(".col-sm-3", [
                m("p", "Duck Life 3: Evolution"),
                m("a", {href: "/DuckLife3", config: m.route}, [
                    m("img.img-rounded.img-responsive", {src: "/images/ducklife3evolutionthumbnail.png", alt: "Duck Life 3"})
                ]),
                m("br")
            ]),
            m(".col-sm-3", [
                m("p", "Duck Life 3: Evolution"),
                m("a", {href: "/DuckLife3", config: m.route}, [
                    m("img.img-rounded.img-responsive", {src: "/images/ducklife3evolutionthumbnail.png", alt: "Duck Life 3"})
                ]),
                m("br")
            ]),
            m(".col-sm-3", [
                m("p", "Duck Life 3: Evolution"),
                m("a", {href: "/DuckLife3", config: m.route}, [
                    m("img.img-rounded.img-responsive", {src: "/images/ducklife3evolutionthumbnail.png", alt: "Duck Life 3"})
                ]),
                m("br")
            ])
        ]),
        m("center", [
            m(".row", [
                m("nav", [
                    m("ul.pagination", [
                        m("li", [
                            m("a", {href: "#", "aria-label": "Previous"}, [
                                m("span", {"aria-hidden": "true"}, "«")
                            ])
                        ]),
                        m("li", [m("a", {href: "#"}, "1")]),
                        m("li", [m("a", {href: "#"}, "2")]),
                        m("li", [m("a", {href: "#"}, "3")]),
                        m("li", [m("a", {href: "#"}, "4")]),
                        m("li", [m("a", {href: "#"}, "5")]),
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

gameOverview.controller = function() {};
