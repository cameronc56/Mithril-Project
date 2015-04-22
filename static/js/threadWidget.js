var threadWidget = {};

threadWidget.view = function(ctrl, args) {
    return m(".container-fluid", [
        m(".row", [
            m("a", {href: "/forum/page/1#upvote"}, [

            ]),
            m("a", {href: "/forum/page/1#downvote", config: m.route}),
            m("span.glyphicon.glyphicon-arrow-up.pull-left", {style: "margin-top: 35px;"}),
            m("span.glyphicon.glyphicon-arrow-down.pull-left", {style: "margin-top: 35px; margin-right: 10px;"}),
            m(".media",
            {
                style: "margin-top: 10px; " +
                "border-style: solid; " +
                "border-width: 2px; " +
                "border-color: #8A9BB8; " +
                "border-radius: 4px;"
            }, [
                m(".media-left", [
                    m("a", {href: "", config: m.route}, [
                        m("img.media-object", {src: "https://i.imgur.com/eevjESG.jpg", alt: "Quack!~", style: "height: 64px; width: 64px;"})
                    ])
                ]),
                m(".media-body", [
                    m("a", {href: "", config: m.route}, [
                        m("h4.media-heading.clearfix", args.title)
                    ]),

                    m("p.pull-left", "Submitted 3 hours ago by Cameronc")
                ])
            ])
        ])
    ])
};

threadWidget.controller = function(args) {
    var me = {};
    return me;
};