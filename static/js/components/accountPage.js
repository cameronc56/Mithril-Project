var accountPage = {};

accountPage.view = function(ctrl) {
    $("#imageInput").change(function(){
        previewImage(this);
    });

    function previewImage(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //previews image:
                $('#profilePhoto').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function uploadPhoto() {
        var formData = new FormData;
        formData.append("pic", document.getElementById("imageInput").files[0]);
        return m.request({
            method: "POST",
            url: "/setUserProfilePhoto",
            data: formData,
            serialize: function(value) {return value}
        });
    }

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
                            m("a.btn.btn-default", {style: "margin-left: 5px;", href: "#/account", role: "button", onclick: uploadPhoto}, "Save"),
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

    return me;
};

