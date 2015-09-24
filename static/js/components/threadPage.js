var threadPage = {};

threadPage.view = function(ctrl, args) {

    var title = ctrl.thread()[1];
    var body = ctrl.thread()[2];
    var date = ctrl.thread()[3];
    var username = ctrl.thread()[4];

    return m(".container", [
        //post modal for original thread
        m.component(newPostModal, {threadPageCtrl: ctrl, postId: "thread", indentLevel: -1}),
        m(".row", [
            m(".col-sm-offset-1.col-sm-10", [
                m(".panel.panel-default", [
                    m(".panel-heading", [
                        m(".panel-title", title)
                    ]),
                    m(".panel-body", body),
                    m(".panel-footer", [
                        "Posted at: " + date + " by " + username,
                        ctrl.isLoggedIn() ?
                            m("a.pull-right", {href:"#newPostModalthread", "data-toggle":"modal"}, [
                                "Reply ",
                                m("span.glyphicon.glyphicon-comment", {"aria-hidden": "true"})
                            ])
                        : ""
                    ])
                ])
            ])
        ]),
        m("hr"),
        (function() {
            return _.times(ctrl.posts().length, function(i) {
                return m(".row", [
                    m("div", {class: "col-sm-offset-" + (1 + ctrl.posts()[i][6]).toString() + " col-sm-10"}, [
                        m(".panel.panel-default", [
                            m(".panel-body", ctrl.posts()[i][4]),
                            m(".panel-footer", [
                                "Posted at: " + ctrl.posts()[i][3] + " by " + ctrl.posts()[i][2],
                                ctrl.isLoggedIn() ?
                                    m("a.pull-right", {href:"#newPostModal" + ctrl.posts()[i][0], "data-toggle":"modal"}, [
                                        "Reply ",
                                        m("span.glyphicon.glyphicon-comment", {"aria-hidden": "true"}),
                                    ])
                                : ""
                            ])
                        ])
                    ]),
                    m.component(newPostModal, {threadPageCtrl: ctrl, postId: ctrl.posts()[i][0], indentLevel: ctrl.posts()[i][6]})
                ])
            });
        })()
    ])
};


threadPage.controller = function(args) {
    var me = {};

    me.postIsAdded = function() {
        me.getPosts();
    };

    me.threadId = m.prop(m.route.param("threadId"));
    me.thread = m.prop([]);
    me.getThread = function() {
        m.request({
            method: "POST",
            url: "/getThread",
            data: {"threadId": me.threadId()}
        }).then(function(response) {
            me.thread(response.thread);
        })
    };
    me.getThread();


    me.posts = m.prop([]);
    me.getPosts = function() {
        m.request({
            method: "POST",
            url: "/getPosts",
            data: {"threadId": me.threadId()}
        }).then(function(response) {
            me.posts(response.posts);
        })
    };
    me.getPosts();

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
