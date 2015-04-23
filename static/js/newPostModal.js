var newPostModal = {};

newPostModal.view = function(ctrl, args) {
    return m(".modal.fade#newPostModal", {role: "dialog"}, [
        m(".modal-dialog", [
            m(".modal-content", [
                m("form.form-horizontal", [
                    m(".modal-header", [
                        m("h4", "New Post")
                    ]),
                    m(".modal-body", [
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "threadTitle"}, "Thread Title"),
                            m(".col-lg-10", [
                                m("input.form-control#threadTitle", {onkeyup: m.withAttr("value", ctrl.threadTitle), type: "text", value: ctrl.threadTitle()})
                            ])
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "threadBody"}, "Text"),
                            m(".col-lg-10", [
                                m("textarea.form-control#threadBody", {rows: "8", onkeyup: m.withAttr("value", ctrl.threadBody), value: ctrl.threadBody()})
                            ])
                        ])
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
    me.threadTitle = m.prop("");
    me.threadBody = m.prop("");
    me.submitPost = function() {
        console.log(me.threadTitle() + me.threadBody());
    };
    return me;
};