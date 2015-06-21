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
        console.log("view rendered"),
        threads.map(function(thread) {
            console.log(thread);
            return m(".row", [
                m.component(threadWidget, {title: thread[0], bodyText: thread[1], date: thread[2], submitter: thread[3]})
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
        m.component(newThreadModal, {controller: ctrl})
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
