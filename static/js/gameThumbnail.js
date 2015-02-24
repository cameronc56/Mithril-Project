var gameThumbnail = {};

gameThumbnail.view = function(ctrl) {
    return m(".col-sm-3", [
        m("p", "Duck Life 3: Evolution"),
        m("a", {href: "/DuckLife3", config: m.route}, [
            m("img.img-rounded.img-responsive", {src: "/images/ducklife3evolutionthumbnail.png", alt: "Duck Life 3"})
        ]),
        m("br")
    ])
};

gameThumbnail.controller = function() {};
