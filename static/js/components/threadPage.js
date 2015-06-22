var threadPage = {};

threadPage.view = function(ctrl, args) {
    return m(".container", [
        m("p", "thread: " + ctrl.thread()),
        m("p", "threadId: " + ctrl.threadId())
    ])
};


threadPage.controller = function(args) {
    var me = {};
    console.log("controller loaded");
    me.threadId = m.prop(m.route.param("threadId"));
    console.log(me.threadId());
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
