var gameOverview = {};

gameOverview.view = function(ctrl) {
    return m("center", [
        m("#homePageGridContainer.container", [
            m(".row", [
                m("h3", [
                    m("a", {href: "/featured", config: m.route}, "Featured Games")
                ])
            ]),
            m("#featured.row", [
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
            ])
        ])
    ]);
};

gameOverview.controller = function() {};
