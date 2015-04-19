var threadWidget = {};

threadWidget.view = function(ctrl, args) {
    return m("div", [
        m(".media", {style: "border-style: solid; border-width: 3px; margin-top: 10px; border-color: #8A9BB8; border-radius: 5px;"}, [
            m(".media-left.media-top.pull-left", [
                m("a", {href: "", config: m.route}, [
                    m("img.media-object", {src: "https://i.imgur.com/eevjESG.jpg", alt: "Quack!~", style: "height: 64px; width: 64px;"})
                ])
            ]),
            m(".media-body.media-right", [
                m("a", {href: "", config: m.route}, [
                    m("h4.media-heading", args.title)
                ]),
                //m("p", "upvote downvote"),
                m("p", "Submitted 3 hours ago by Cameronc")
            ])
        ])
    ])
};

threadWidget.controller = function(args) {
    var me = {};
    return me;
};