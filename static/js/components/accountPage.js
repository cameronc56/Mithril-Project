var accountPage = {};

accountPage.view = function(ctrl) {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#profilePhoto').attr('src', e.target.result);
                ctrl.uploadProfilePhoto(e.target.result, input.files[0].name)
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imageInput").change(function(){
        readURL(this);
    });
    return m(".container", [
        m(".row", [
            m(".well.well-sm.col-sm-3", {style: "width: 260px; padding: 10px;"}, [
                m(".thumbnail", {style: "margin-bottom: 0px;"}, [
                    m("img#profilePhoto", {src: "http://www.saddleback.edu/uploads/asg/blank-profile-hi.png"}),
                    m("center.caption", [
                        m("h4", "Profile Picture"),
                        m("p", [
                                m("span.btn.btn-primary.btn-file", "Upload", [
                                    m("input#imageInput", {type: "file"})
                                ]),

                            m("a.btn.btn-default", {style: "margin-left: 5px;", href: "#/account", role: "button"}, "Delete")
                        ])
                    ])
                ])
            ]),
            m(".well.well-sm.col-sm-3", {style: "width: 260px; padding: 10px;"}, [
                m("form.form-horizontal", [
                    m(".input-group", [
                        m("span.input-group-addon", [
                            m("i.glyphicon.glyphicon-lock")
                        ]),
                        m("input.form-control.pull-left", {onkeyup: m.withAttr("value", ctrl.oldPassword), type: "password", placeholder: "Old Password", style: "width: 200px;"})
                    ]),
                    m(".input-group", {style: "margin-top: 10px;"}, [
                        m("span.input-group-addon", [
                            m("i.glyphicon.glyphicon-lock")
                        ]),
                        m("input.form-control.pull-left", {onkeyup: m.withAttr("value", ctrl.newPassword), type: "password", placeholder: "New Password", style: "width: 200px;"})
                    ]),
                    m(".input-group", {style: "margin-top: 10px;"}, [
                        m("span.input-group-addon", [
                            m("i.glyphicon.glyphicon-lock")
                        ]),
                        m("input.form-control.pull-left", {onkeyup: m.withAttr("value", ctrl.confirmNewPassword), type: "password", placeholder: "Confirm New Password", style: "width: 200px;"})
                    ]),
                    m(".input-group", [
                        m("a.btn.btn-primary.pull-left", {onclick: ctrl.changePassword, style: "margin-top: 10px;"}, "Change Password")
                    ])
                ])
            ])
        ])
    ])
};

accountPage.controller = function() {
    var me = {};

    me.username = m.prop("Username");
    cookies.checkSession(function(response) {
        me.username(response.username)
    });

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

    me.uploadProfilePhoto = function(myFile, filename) {
        console.log(JSON.stringify(myFile));
        console.log(filename);
        cookies.checkSession(function(response) {
            me.username(response.username)
        });
        m.request({
            method: "POST",
            url: "/setUserProfilePhoto",
            data: {file: JSON.stringify(myFile), filename: filename, username: me.username}
        }).then(function(response) {
            console.log(response)
        })
    };

    return me;
};

