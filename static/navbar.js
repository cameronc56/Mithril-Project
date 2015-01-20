var navbar = function(ctrl) {
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
                                    m("li", [ m("a", {onclick: function(){ m.route("/navbar") } }, "All Games"), ]),
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
