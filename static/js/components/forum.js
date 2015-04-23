var forum = {};

forum.vm = {};

forum.view = function(ctrl) {
    var arr = ["My first thread", "Ducks are cool", "Ducks are cute"];
    return m(".container", [
        m(".row", [
            m("a.btn.btn-primary.pull-right", {href:"#newPostModal", "data-toggle":"modal"}, "New Post")
        ]),
        arr.map(function(data) {
            return m(".row", [
                m.component(threadWidget, {title: data})
            ])
        }),
        m("nav", [
            m("ul.pager", [
                parseInt(m.route.param("pageNumber")) > 1 ?
                m("li.pull-left", [
                    m("a", {href: "/forum/page/" + (parseInt(m.route.param("pageNumber")) - 1).toString(), config: m.route}, "Previous")
                ])
                : "",
                m("li.pull-right", [
                    m("a", {href: "/forum/page/" + (parseInt(m.route.param("pageNumber")) + 1).toString(), config: m.route}, "Next")
                ])
            ])
        ])
    ]);
};

forum.controller = function() {
    var me = {};
    return me;
};
