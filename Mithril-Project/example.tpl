<!doctype html>
<html>
<head>
    <script type="text/javascript" src="{{ get_url('static', filename = 'mithril.js') }}"></script>
    <link rel="stylesheet" href="{{ get_url('static', filename = 'bootstrap.css') }}">
    <link rel="stylesheet" href="{{ get_url('static', filename = 'css.css'       ) }}">
    <script type="text/javascript" src="{{ get_url('static', filename = 'jquery-2.1.1.js') }}" charset="utf-8"></script>
    <script type="text/javascript" src="{{ get_url('static', filename = 'bootstrap.js') }}" charset="utf-8"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

	<div id="header"></div>
<!--
    <div id="main"></div>
-->
<script>
	var layout = function(nav, body) {
		return m(".layout", [
			m("header", nav),
			m("main", body)
		]);
	};

	var nav = function() {
		return m("div", [
            m("div", {class:"navbar navbar-inverse navbar-static-top"}, [
                m("div", {class:"container"}, [
                    m("a", {class:"navbar-brand", href: "/"}, "Little Duckling Games"),
                    m("button", {class:"navbar-toggle", "data-toggle":"collapse", "data-target":".navHeaderCollapse"}, [
                        m("span", {class:"icon-bar"}),
                        m("span", {class:"icon-bar"}),
                        m("span", {class:"icon-bar"}),
                    ]),//end button
                    m("div", {class:"collapse navbar-collapse navHeaderCollapse"}, [
                        m("ul", {class:"nav navbar-nav navbar-right"}, [
                            m("li", {class:"active"}, [
                                m("a", {href:"/"}, "Home"),
                            ]),//end li
                            m("li", {class:"dropdown"}, [
                                m("a", {class:"dropdown-toggle", "data-toggle":"dropdown", href:"#"}, "Games", m("b", {class:"caret"}) ),
                                m("ul",{class:"dropdown-menu"}, [
                                    m("li", [ m("a", {href:"#"}, "All Games"), ]),
                                    m("li", [ m("a", {href:"#"}, "Categories"), ]),
                                    m("li", [ m("a", {href:"#"}, "Featured"  ), ]),
                                    m("li", [ m("a", {href:"#"}, "Popular"   ), ]),
                                    m("li", [ m("a", {href:"#"}, "New"       ), ]),
                                ]),//end ul
                            ]),//end li
                            m("li", [ m("a", {href:"javascript:showForum();"        }, "Forums"  ), ]),
                            m("li", [ m("a", {href:"#"                              }, "About"   ), ]),
                            m("li", [ m("a", {href:"#contact", "data-toggle":"modal"}, "Contact" ), ]),
                            m("li", {class:"dropdown"}, [
                                m("a", {class:"dropdown-toggle", "data-toggle":"dropdown", href:"#"}, "Account", m("b", {class:"caret"}) ),
                                m("ul", {class:"dropdown-menu"}, [
                                    m("li", [ m("a", {href:"javascript:showAccountPage();"}, "Account Details") ]),
                                    m("li", [ m("a", {href:"/logout", "method":"POST"     }, "Logout")         ]),
                                ])//end ul
                            ]),//end li
                        ]), //end ul
                    ]), //end div
                ]),//end container
            ]),// end navbar div
        ]); //end return
	};

	var body = function() {
		return [
			"body here"
		];
	};
	var differentbody = function() {
		return [
			"no body here"
		];
	};

	var mixinLayout = function(layout, nav, body) {
		return function() {
			return layout(nav(), body());
		};
	};

	var homepage = {};
	homepage.controller = function() { };
	homepage.view = mixinLayout(layout, nav, body);

	var gamepage = {};
	gamepage.controller = function() { };
	gamepage.view = mixinLayout(layout, nav, differentbody);

	m.route.mode = 'hash';

	m.route(document, "/", {
		"/": homepage,
		"/foo": homepage,
		"/bar": gamepage
	});

	m.module(document.getElementById("main"), {controller: function() {}, view: layout});
</script>
</body>
</html>
