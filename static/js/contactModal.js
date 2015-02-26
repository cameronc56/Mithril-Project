var contactModal = {};
contactModal.view = function() {
    return m(".modal.fade[id='contact'][role='dialog']", [
        m(".modal-dialog", [
            m(".modal-content", [
                m("form.form-horizontal", [
                    m(".modal-header", [
                        m("h4", "Contact the Admin")
                    ]),
                    m(".modal-body", [
                        m(".form-group", [
                            m("label.col-lg-2.control-label[for='contact-name']", "Name:"),
                            m(".col-lg-10", [
                                m("input.form-control[id='contact-name'][placeholder='Full Name'][type='text']")
                            ])
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label[for='contact-email']", "Email:"),
                            m(".col-lg-10", [
                                m("input.form-control[id='contact-email'][placeholder='you@example.com'][type='email']")
                            ])
                        ]),
                        m(".form-group", [
                            m("label.col-lg-2.control-label[for='contact-msg']", "Message:"),
                            m(".col-lg-10", [
                                m("textarea.form-control[id='contact-msg'][rows='8']")
                            ])
                        ])
                    ]),
                    m(".modal-footer", [
                        m("a.btn.btn-primary[data-dismiss='modal']", "Close"),
                        m("button.btn.btn-primary[type='submit']", {onclick: contactModal.controller.sendEmail}, "Send")
                    ])
                ])
            ])
        ])
    ])
};

contactModal.controller =  {
    sendEmail: function() {
        var emailName = $('#contact-name');
        var emailAddress = $('#contact-email');
        var emailBody = $('#contact-msg');
        var goodColor = "#62BF65";
        var badColor = "#E67373";
        $.ajax({
            type: "POST",
            url: "/sendEmail",
            data: JSON.stringify({"emailName":emailName.val(), "emailAddress":emailAddress.val(), "emailBody":emailBody.val()}),
            dataType: "JSON",
            contentType: "application/json",
            async: true,
            cache: false,
            success: function(msg) {
                var status = msg;
                emailName.css("backgroundColor", goodColor);
                emailAddress.css("backgroundColor", goodColor);
                emailBody.css("backgroundColor", goodColor);
            }
        });
    }
};

