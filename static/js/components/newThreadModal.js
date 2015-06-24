var newThreadModal = {};

newThreadModal.view = function(ctrl, args) {
    return m(".modal.fade#newThreadModal", {role: "dialog"}, [
        m(".modal-dialog", [
            m(".modal-content", [
                m("form.form-horizontal", [
                    m(".modal-header", [
                        m("h4", "New Thread")
                    ]),
                    m(".modal-body", [
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "threadTitle"}, "Thread Title"),
                            m(".col-lg-10", [
                                m("input.form-control#threadTitle", {onkeyup: m.withAttr("value", ctrl.threadTitle), type: "text"})
                            ])
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "threadBody"}, "Text"),
                            m(".col-lg-10", [
                                m("textarea.form-control#threadBody", {rows: "8", onkeyup: m.withAttr("value", ctrl.threadBody), type: "text"})
                            ])
                        ])
                    ]),
                    m(".modal-footer", [
                        m("a.btn.btn-primary.pull-left", {"data-dismiss":"modal"}, "Close"),
                        m("button.btn.btn-primary", {onclick: _.compose(args.forumController.getThreads, ctrl.submitThread), "data-dismiss": "modal", type: "submit"}, "Submit")
                    ])
                ])
            ])
        ])
    ]);
};

newThreadModal.controller = function(args) {
    var me = {};
    me.threadTitle = m.prop("");
    me.threadBody = m.prop("");
    me.username = m.prop();
    me.submitThread = function() {
        m.request({
            method: "POST",
            url: "/newThread",
            data: {"threadTitle": me.threadTitle(), "threadBody": me.threadBody(), username: me.username()}
        }).then(function(response) {
            me.threadTitle("");
            me.threadBody("");
            m.render();
        })
    };
    cookies.checkSession(function(response) {
        if(response.username == "Username") {

        } else {
            me.username(response.username);
        }
    });
    return me;
};