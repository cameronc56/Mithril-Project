var newPostModal = {};

newPostModal.view = function(ctrl, args) {
    return m(".modal.fade", {role: "dialog", id: "newPostModal" + args.postId}, [
        m(".modal-dialog", [
            m(".modal-content", [
                m("form.form-horizontal", [
                    m(".modal-header", [
                        m("h4", "New Post")
                    ]),
                    m(".modal-body", [
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "postBody"}, "Text"),
                            m(".col-lg-10", [
                                m("textarea.form-control#postBody", {rows: "8", onkeyup: m.withAttr("value", ctrl.postBody), type: "text"})
                            ])
                        ]),
                        m("p", "Thread Id: " + args.threadPageCtrl.threadId() + " Post Id: " + args.postId + " Indent Level: " + args.indentLevel)
                    ]),
                    m(".modal-footer", [
                        m("a.btn.btn-primary.pull-left", {"data-dismiss":"modal"}, "Close"),
                        m("button.btn.btn-primary", {onclick: ctrl.submitPost, "data-dismiss": "modal", type: "submit"}, "Post")
                    ])
                ])
            ])
        ])
    ]);
};

newPostModal.controller = function(args) {
    var me = {};

    me.postBody = m.prop("");
    me.username = m.prop("");
    me.threadId = m.prop(args.threadPageCtrl.threadId());
    me.postId = m.prop(args.postId);
    me.indentLevel = m.prop(args.indentLevel + 1);

    me.submitPost = function() {
        m.request({
            method: "POST",
            url: "/newPost",
            data: {"postBody": me.postBody(), "username": me.username(), "threadId": me.threadId(), "parentPostId": me.postId(), "indentLevel": me.indentLevel()}
        }).then(function(response) {
            me.postBody("");
            args.threadPageCtrl.postIsAdded();
        })
    };

    cookies.checkSession(function(response) {
        if(response.username != "Username") {
            me.username(response.username);
        }
    });

    return me;
};