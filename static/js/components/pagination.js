var pagination = {};

pagination.view = function(ctrl) {
    var displayPageNumber = function(i) {
        return m("li", {class: ctrl.highlightCurrentPage(i)}, [
            m("a", {href: "/page/" + ctrl.pageNumberToDisplay(i), config: m.route}, ctrl.pageNumberToDisplay(i))
        ]);
    };
    return m("center", [
        m(".row", [
            m("nav", [
                !ctrl.isFavoritesPage() ?
                    m("ul.pagination", {style: "margin-bottom: -20px;"},[
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
                    : ""
            ])
        ])
    ])
};

pagination.controller = function() {
    var me = {};
    //pagination stuff
    me.isFavoritesPage = m.prop(m.route().indexOf("favoriteGames") > -1);
    me.highlightCurrentPage = function(i) {
        if(parseInt(me.pageNumberToDisplay(i)) == parseInt(m.route.param("pageNumber"))) {
            return "active";
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