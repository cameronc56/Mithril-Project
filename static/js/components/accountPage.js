var accountPage = {};

accountPage.view = function(ctrl) {
    return m(".container", [
        m("p", "Username: " + ctrl.username()),
        m(".row", [
            m("input.form-control.pull-left", {onkeyup: m.withAttr("value", ctrl.oldPassword), placeholder: "Old Password", style: "width: 200px;"})
        ]),
        m(".row", [
            m("input.form-control.pull-left", {onkeyup: m.withAttr("value", ctrl.newPassword), placeholder: "New Password", style: "width: 200px; margin-top: 5px;"})
        ]),
        m(".row", [
            m("input.form-control.pull-left", {onkeyup: m.withAttr("value", ctrl.confirmNewPassword), placeholder: "Confirm New Password", style: "width: 200px; margin-top: 5px;"})
        ]),
        m(".row", [
            m("a.btn.btn-primary.pull-left", {onclick: ctrl.changePassword, style: "margin-top: 5px;"}, "Change Password")

        ])
    ])
};

accountPage.controller = function() {
    var me = {};

    me.username = m.prop("Username");
    cookies.checkSession(function(response) {me.username(response.username)});

    me.oldPassword = m.prop("");
    me.newPassword = m.prop("");
    me.confirmNewPassword = m.prop("");
    me.changePassword = function() {
        if(me.newPassword() == me.confirmNewPassword()) {
            m.request({
                method: "POST",
                url: "/changePassword",
                data: {oldPassword: me.oldPassword().trim(), newPassword: me.newPassword().trim(), username: me.username().trim()}
            }).then(function(response) {
                console.log(response)
            })
        } else {
            console.log("New passwords do not match.")
        }
    };



    return me;
};