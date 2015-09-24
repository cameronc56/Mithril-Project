var forum = {};

forum.vm = {};

forum.view = function(ctrl) {
    var threads = ctrl.threads();
    return m(".container", [
        ctrl.isLoggedIn() ?
            m(".row", [
                m("a.btn.btn-primary.pull-right", {href:"#newThreadModal", "data-toggle":"modal", style: "margin-bottom: 10px;"}, "New Thread")
            ])
            :
            m(".row", [
                m("a.btn.btn-primary.pull-right", {href: "#loginModal", "data-toggle":"modal", style: "margin-bottom: 10px;"}, "Login to Post")
            ]),
        threads.map(function(thread) {
            return m(".row", [
                m.component(threadWidget, { id: thread[0], title: thread[1], bodyText: thread[2], date: thread[3], submitter: thread[4]}),
                m("hr", {style: "margin-top: 0px; margin-bottom: 20px;"})
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
        ]),
        m.component(newThreadModal, {forumController: ctrl})
    ]);
};

forum.controller = function() {
    var me = {};
    me.threads = m.prop([]);
    me.getThreads = function() {
        m.request({
            method: "GET",
            url: "/getThreads"
        }).then(function(response) {
            me.threads(response.threads.reverse());
        })
    };
    me.getThreads();

    me.isLoggedIn = m.prop(false);
    me.username = m.prop();
    cookies.checkSession(function(response) {
        if(response.username == "Username") {
            me.isLoggedIn(false);
        } else {
            me.isLoggedIn(true);
            me.username(response.username);
        }
    });
    return me;
};
