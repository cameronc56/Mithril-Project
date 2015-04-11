var contactModal = {};
contactModal.view = function(ctrl) {
    return [
        m(".modal.fade#contact", {role: "dialog"}, [
            m(".modal-dialog", [
                m(".modal-content", [
                    m("form.form-horizontal", [
                        m(".modal-header", [
                            m("h4", "Contact the Admin")
                        ]),
                        m(".modal-body", [
                            m(".form-group", [
                                m("label.col-lg-2.control-label", {for: "contact-name"}, "Name:"),
                                m(".col-lg-10", [
                                    m("input.form-control#contact-name", {onkeyup: m.withAttr("value", ctrl.name), style: ctrl.fieldColor(), placeholder: "Full Name", type: "text"})
                                ])
                            ]),
                            m(".form-group", [
                                m("label.col-lg-2.control-label", {for: "contact-email"}, "Email:"),
                                m(".col-lg-10", [
                                    m("input.form-control#contact-email", {onkeyup: m.withAttr("value", ctrl.email), style: ctrl.fieldColor(), placeholder: "you@example.com", type: "email"})
                                ])
                            ]),
                            m(".form-group", [
                                m("label.col-lg-2.control-label", {for: "contact-msg"}, "Message:"),
                                m(".col-lg-10", [
                                    m("textarea.form-control#contact-msg", {rows: "8", onkeyup: m.withAttr("value", ctrl.message), style: ctrl.fieldColor()})
                                ])
                            ])
                        ]),
                        m(".modal-footer", [
                            m("a.btn.btn-primary.pull-left", {"data-dismiss":"modal"}, "Close"),
                            m("button.btn.btn-primary", {onclick: ctrl.sendEmail, "data-dismiss": "modal", type: "submit"}, "Send")
                        ])
                    ])
                ])
            ])
        ])
    ]
};

contactModal.controller = function() {
    var me = {};
    me.name = m.prop("");
    me.email = m.prop("");
    me.message = m.prop("");
    me.fieldColor = m.prop();
    me.sendEmail = function() {
        m.request({
            method: "POST",
            url: "/sendEmail",
            data: {"emailName": me.name(), "emailAddress": me.email(), "emailBody": me.message()}
        }).then(function(response) {
            me.fieldColor("border-color: " + colors.goodColor + ";");
        });
    };
    return me;
};