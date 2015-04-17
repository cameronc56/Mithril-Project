var forum = {};

forum.vm = {};

forum.view = function(ctrl) {
    var arr = ["first really really really long one", "second", "third"];
    return m("div", [
        arr.map(function(data) {
            return m.component(threadWidget, {title: data})
        }),
        m("nav", [
            m("ul.pager", [
                m("li", [
                    m("a", {href: "#"}, "Previous")
                ]),
                m("li", [
                    m("a", {href: "#"}, "Next")
                ])
            ])
        ])
    ]);
};

forum.controller = function() {
    var me = {};
    return me;
};
