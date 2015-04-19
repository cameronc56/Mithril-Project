var navbar = {};

navbar.view = function(ctrl) {
    return m("div", {class:"navbar navbar-default navbar-static-top"}, [
                m("div", {class:"container"}, [
                    m("a", {href: "/"}, [
                       m("img.img-circle.pull-left", {src: "https://i.imgur.com/eevjESG.jpg", alt: "Quack!~", style: "height: 40px; margin-right: 10px; margin-top: 5px;"})
                    ]),
                    m("a.navbar-brand", {href: "/"}, "Little Duckling Games"),
                    m("button", {class:"navbar-toggle", "data-toggle":"collapse", "data-target":".navHeaderCollapse"}, [
                        m("span", {class:"icon-bar"}),
                        m("span", {class:"icon-bar"}),
                        m("span", {class:"icon-bar"})
                    ]),//end button
                    m("div", {class:"collapse navbar-collapse navHeaderCollapse"}, [
                        m("ul", {class:"nav navbar-nav navbar-right"}, [
                            m("li", {class:"active"}, [
                                m("a", {href:"/", config: m.route }, "Home")
                            ]),//end li
                            m("li", {class:"dropdown"}, [
                                m("a", {class:"dropdown-toggle", "data-toggle":"dropdown", href:"#"}, "Games", m("b", {class:"caret"}) ),
                                m("ul",{class:"dropdown-menu"}, [
                                    m("li", [ m("a", {href: "/page/1", onclick: _.compose(gameOverview.sortBy, function(){return "Most Played"}, routing.reroute), config: m.route }, "Most Played" ) ]),
                                    m("li", [ m("a", {href: "/page/1", onclick: _.compose(gameOverview.sortBy, function(){return "Alphabetically"}, routing.reroute), config: m.route }, "All Games") ])
                                ])//end ul
                            ]),//end li
                            m("li", [ m("a", {href:"/forum/page/1", config: m.route}, "Forums"  ) ]),
                            m("li", [ m("a", {href:"#contact", "data-toggle":"modal"}, "Contact" ) ]),
                            m("li", {class:"dropdown"}, [
                                m("a", {class:"dropdown-toggle", "data-toggle":"dropdown", href:""}, ctrl.username(), m("b", {class:"caret"})),
                                m("ul", {class:"dropdown-menu"}, [
                                    ctrl.isLoggedIn() ?
                                        [
                                            m("li", [
                                                m("a", {href:"#/account/" + ctrl.username()}, "Account ", [
                                                        m("span.glyphicon.glyphicon-user.pull-right", {"aria-hidden": "true"})
                                                ])
                                            ]),
                                            m("li", [
                                                m("a", {href: "#/favoriteGames/page/1"}, "Favorites ", [
                                                    m("span.glyphicon.glyphicon-star.pull-right", {"aria-hidden": "true"})
                                                ])
                                            ]),
                                            m("li", [
                                                m("a", {href:"", onclick: ctrl.deleteUserSession}, "Logout", [
                                                    m("span.glyphicon.glyphicon-log-out.pull-right", {"aria-hidden": "true"})
                                                ])
                                            ])
                                        ]
                                    :
                                       [
                                            m("li", [
                                                m("a", {href:"#loginModal", "data-toggle": "modal"}, "Login", [
                                                    m("span.glyphicon.glyphicon-log-in.pull-right", {"aria-hidden": "true"})
                                                ])
                                            ])
                                        ]
                                ])//end ul
                            ])//end li
                        ]) //end ul
                    ]) //end div
                ])//end container
        ]); //end return
}; //end navbar.view




navbar.controller = function() {
    var me = {};
    me.deleteUserSession = function() {
        cookies.deleteCookie("session");
    };
    me.username = m.prop("Account");
    cookies.checkSession(function(response) {me.username(response.username)});
    me.isLoggedIn = function() {
        return me.username() !== "Account";
    };
    return me;
};

