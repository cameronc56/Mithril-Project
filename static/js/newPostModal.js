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
                                m("input.form-control#threadTitle"/*, {onkeyup: m.withAttr("value", ctrl.name), style: ctrl.fieldColor(), placeholder: "Full Name", type: "text"}*/)
                            ])
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "threadBody"}, "Text"),
                            m(".col-lg-10", [
                                m("textarea.form-control#threadBody", {rows: "8"}/*, {rows: "8", onkeyup: m.withAttr("value", ctrl.message), style: ctrl.fieldColor()}*/)
                            ])
                        ])
                    ]),
                    m(".modal-footer", [
                        m("a.btn.btn-primary.pull-left", {"data-dismiss":"modal"}, "Close"),
                        m("button.btn.btn-primary"/*, {onclick: ctrl.sendEmail, "data-dismiss": "modal", type: "submit"}*/, "Post")
                    ])
                ])
            ])
        ])
    ]);
};

newPostModal.controller = function(args) {
    var me = {};
    return me;
};