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
<!--
	<div id="header"></div>
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
		return [
			"nav here"
		];
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

	m.route(document, "/", {
		"/": homepage,
		"/bar": gamepage
	});

	m.route.mode = 'hash';

	m.module(document, {controller: function() {}, view: layout});
</script>
</body>
</html>
