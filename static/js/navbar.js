var navbar = {};

navbar.view = function(ctrl) {
    return m("div", [
            m("div", {class:"navbar navbar-default navbar-static-top"}, [
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
                                    m("li", [ m("a", {href:"", config: m.route }, "All Games" ) ]),
                                    m("li", [ m("a", {href:"", config: m.route }, "Categories") ]),
                                    m("li", [ m("a", {href:"", config: m.route }, "Most Played"   ) ]),
                                ]),//end ul
                            ]),//end li
                            m("li", [ m("a", {href:"/showForum", config: m.route}, "Forums"  ) ]),
                            m("li", [ m("a", {href:"#contact", "data-toggle":"modal"}, "Contact" ) ]),
                            m("li", {class:"dropdown"}, [
                                m("a", {class:"dropdown-toggle", "data-toggle":"dropdown", href:""}, accountPageCtrl.navbarUsername(), m("b", {class:"caret"}) ),
                                m("ul", {class:"dropdown-menu"}, [
                                    m("li", [ m("a", {href:"#/account/" + accountPageCtrl.username()}, "Account Details") ]),
                                    m("li", [ m("a", {href:"#", config: m.route }, "Favorites") ]),
                                    m("li", [ m("a", {href:"", onclick: ctrl.deleteUserSession}, "Logout")         ])
                                ])//end ul
                            ]),//end li
                        ]), //end ul
                    ]), //end div
                ]),//end container
            ]),// end navbar div
        ]); //end return
}; //end navbar.view

navbar.controller = function() {
    var me = {};
    me.deleteUserSession = function() {
        cookies.deleteCookie("session");
    };
    return me;
};

