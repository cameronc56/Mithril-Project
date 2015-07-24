var threadWidget = {};

threadWidget.view = function(ctrl, args) {
    return m(".container-fluid", [
        m(".row", [

            m("a", {href: "/forum/page/1", config: m.route}, [
                m("span.glyphicon.glyphicon-arrow-up.pull-left", {style: "margin-top: 35px; margin-left: 10px;"})
            ]),
            m("a", {href: "/forum/page/1", config: m.route}, [
                m("span.glyphicon.glyphicon-arrow-down.pull-left", {style: "margin-top: 35px; margin-right: 10px;"})
            ]),

            m(".well.well-sm", {style: "border-style: solid; border-width: 1px; border-color: gray; background-color: #eee; width: 100%;"}, [
                m(".media-left", [
                    m("a", {href: "/forum/thread/" + args.id, config: m.route}, [
                        m("img.media-object", {src: "https://i.imgur.com/eevjESG.jpg", alt: "Quack!~", style: "height: 64px; width: 64px;"})
                    ])
                ]),
                m(".media-body", [
                    m("a", {href: "/forum/thread/" + args.id, config: m.route}, [
                        m("h4.media-heading.clearfix", args.title)
                    ]),
                    m("p.pull-left", "Submitted at " + args.date + " by: " + args.submitter)
                ])
            ])
        ])
    ])
};

threadWidget.controller = function(args) {
    var me = {};
    return me;
};

