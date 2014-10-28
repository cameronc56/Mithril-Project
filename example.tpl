
<script>
var layout = function() {
	return m(".layout", [
		m("header", nav),
		m("main", body)
	]);
};

var nav = function() {
	return [
		"nav here"
	];
}

var body = function() {
	return [
		"body here"
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
gamepage.view = mixinLayout(layout, nav);

m.route(document, "/", {
	"/": homepage,
	"/bar": gamepage
});

m.module(document, {controller: function() {}, view: layout);
</script>