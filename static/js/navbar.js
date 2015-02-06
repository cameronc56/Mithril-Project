var navbar = {};

navbar.view = function(ctrl) {
    return m("div", [
            m("div", {class:"navbar navbar-inverse navbar-static-top"}, [
                m("div", {class:"container"}, [
                    m("a", {class:"navbar-brand", href: "/jumbotron", config: m.route }, "Little Duckling Games"),
                    m("button", {class:"navbar-toggle", "data-toggle":"collapse", "data-target":".navHeaderCollapse"}, [
                        m("span", {class:"icon-bar"}),
                        m("span", {class:"icon-bar"}),
                        m("span", {class:"icon-bar"}),
                    ]),//end button
                    m("div", {class:"collapse navbar-collapse navHeaderCollapse"}, [
                        m("ul", {class:"nav navbar-nav navbar-right"}, [
                            m("li", {class:"active"}, [
                                m("a", {href:"/", config: m.route }, "Home"),
                            ]),//end li
                            m("li", {class:"dropdown"}, [
                                m("a", {class:"dropdown-toggle", "data-toggle":"dropdown", href:"#"}, "Games", m("b", {class:"caret"}) ),
                                m("ul",{class:"dropdown-menu"}, [
                                    m("li", [ m("a", {href:"#", config: m.route }, "All Games" ), ]),
                                    m("li", [ m("a", {href:"#", config: m.route }, "Categories"), ]),
                                    m("li", [ m("a", {href:"#", config: m.route }, "Featured"  ), ]),
                                    m("li", [ m("a", {href:"#", config: m.route }, "Popular"   ), ]),
                                    m("li", [ m("a", {href:"#", config: m.route }, "New"       ), ]),
                                ]),//end ul
                            ]),//end li
                            m("li", [ m("a", {href:"/showForum", config: m.route}, "Forums"  ), ]),
                            m("li", [ m("a", {href:"#", config: m.route         }, "About"   ), ]),
                            m("li", [ m("a", {href:"#contact", "data-toggle":"modal", config: m.route }, "Contact" ), ]),
                            m("li", {class:"dropdown"}, [
                                m("a", {class:"dropdown-toggle", "data-toggle":"dropdown", href:"#",}, "Account", m("b", {class:"caret"}) ),
                                m("ul", {class:"dropdown-menu"}, [
                                    m("li", [ m("a", {href:"/accountPage", config: m.route }, "Account Details") ]),
                                    m("li", [ m("a", {href:"/logout", "method":"POST", config: m.route }, "Logout")         ]),
                                ])//end ul
                            ]),//end li
                        ]), //end ul
                    ]), //end div
                ]),//end container
            ]),// end navbar div
        ]); //end return
}; //end navbar.view

navbar.controller = function() {};

