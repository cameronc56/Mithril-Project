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
    <div id="main"></div>
    <!--<script type="text/javascript" src="{{ get_url('static', filename = 'test.js') }}"></script> -->
</body>
</html>         

<script>
                                     //NAVBAR
var navbar = {}; //init namespace
navbar.vm = {}; //init view-model
navbar.controller = function() {}; //init controller, holds events
navbar.view = function(ctrl) { 
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
                                    m("li", [ m("a", {onclick: function() { m.route("/navbar") } }, "All Games"), ]),
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
}; //end navbar.view


var jumbotron = {}; //init namespace
jumbotron.vm = {};//init view-model
jumbotron.controller = function() {}; //init controller
jumbotron.view = function(ctrl) {
    return m("div", [
            m("div", {class:"container"}, [
                m("div", {class:"jumbotron"}, [
                    m("center", [
                        m("h1", "Quack"), 
                        m("p", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea commodo consequat."),/*end paragraph*/
                        m("a", {class:"btn btn-default", href:"#login",         "data-toggle":"modal"}, "Login"),
                        m("a", {class:"btn btn-primary", href:"#createAccount", "data-toggle":"modal"}, "Create Account"),
                    ]),//end center
                ]),//end jumbotron
            ]),//end container
           ]),//end jumbotron div
        ]);//end return
};//end jumbotron.view




m.route(document.getElementById("main"), "/navbar", {
    "/navbar":navbar,
    "/jumbotron":jumbotron,
    //"/both":both
});

//a sample module
// var dashboard = {
//     controller: function() {
//         this.id = m.route.param("userID");
//     },
//     view: function(controller) {
//         return m("div", controller.id);
//     }
// }

//setup routes to start w/ the `#` symbol
//m.route.mode = "hash";

//define a route
// m.route(document.getElementById("main"), "/dashboard/johndoe", {
//     "/dashboard/:userID": dashboard
// });

//initialize the application
// m.module(document.getElementById("main"), navbar);
</script>