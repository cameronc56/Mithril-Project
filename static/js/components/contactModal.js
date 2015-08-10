var contactModal = {};
contactModal.view = function(ctrl) {
    return m(".modal.fade#contact", {role: "dialog"}, [
        m(".modal-dialog", [
            m(".modal-content", [
                m("form.form-horizontal", [
                    m(".modal-header", [
                        m("h4", "Contact the Admin")
                    ]),
                    m(".modal-body", [
                        m("center", [
                            m("p#register-error-msg", {onchange: m.withAttr("value", ctrl.responseMessage), style: ctrl.responseMessageColor() + "; font-weight: bold;"}, ctrl.responseMessage())
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "contact-name"}, "Name:"),
                            m(".col-lg-10", [
                                m("input.form-control#contact-name", {onkeyup: m.withAttr("value", ctrl.name), style: ctrl.fieldColor(), placeholder: "Full Name", type: "text", value: ctrl.name()})
                            ])
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "contact-email"}, "Email:"),
                            m(".col-lg-10", [
                                m("input.form-control#contact-email", {onkeyup: m.withAttr("value", ctrl.email), style: ctrl.fieldColor(), placeholder: "you@example.com", type: "email", value: ctrl.email()})
                            ])
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label", {for: "contact-msg"}, "Message:"),
                            m(".col-lg-10", [
                                m("textarea.form-control#contact-msg", {rows: "8", onkeyup: m.withAttr("value", ctrl.message), style: ctrl.fieldColor(), value: ctrl.message()})
                            ])
                        ])
                    ]),
                    m(".modal-footer", [
                        m("a.btn.btn-primary.pull-left", {"data-dismiss":"modal"}, "Close"),
                        m("button.btn.btn-primary", {onclick: ctrl.sendEmail, type: "submit"}, "Send")
                    ])
                ])
            ])
        ])
    ]);
};

contactModal.controller = function() {
    var me = {};
    me.name = m.prop("");
    me.email = m.prop("");
    me.message = m.prop("");
    me.fieldColor = m.prop();
    me.responseMessage = m.prop("");
    me.responseMessageColor = m.prop("");
    me.sendEmail = function() {
        if(!inputValidation.isEmail(me.email())) {
            me.responseMessage("Invalid Email");
            me.responseMessageColor("color: " + colors.badColor);
        } else {
            m.request({
                method: "POST",
                url: "/sendEmail",
                data: {"emailName": me.name(), "emailAddress": me.email(), "emailBody": me.message()}
            }).then(function(response) {
                me.fieldColor("border-color: " + colors.goodColor + ";");
                me.responseMessage("Success!");
                me.responseMessageColor("color: " + colors.goodColor);
                setTimeout(function() {
                    document.location.reload(true);
                }, 500);
            });
        }
    };
    return me;
};