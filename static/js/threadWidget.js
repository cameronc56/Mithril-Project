var threadWidget = {};

threadWidget.view = function(ctrl, args) {
    return m(".container", [
        m(".media", [
            m(".media-left.media-top.pull-left", [
                m("a", {href: "#"}, [
                    m("img.media-object", {src: "https://i.imgur.com/eevjESG.jpg", alt: "Quack!~", style: "height: 64px; width: 64px;"})
                ])
            ]),
            m(".media-body.media-right", [
                m("h4.media-heading", args.title)
            ])
        ])
    ])
};

threadWidget.controller = function() {
    var me = {};
    return me;
};