//    <!--                                    BOOTSTRAP FOOTER                               -->
//<div class = "navbar navbar-default navbar-fixed-bottom">
//<div class = "container">
//<p class = "navbar-text pull-left">Site by Cameron Cooks</p>
//</div>
//</div>
//

var footer = {};

footer.view = function(ctrl) {
    return m(".navbar.navbar-default.navbar-fixed-bottom", [
        m(".container", [
            m("p.navbar-text.pull-left", "Site by Cameron Cooks")
        ])
    ])
};

footer.controller = function() {};