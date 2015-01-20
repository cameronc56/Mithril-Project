var jumbotron = function(ctrl) {
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
    ])//end jumbotron div
};//end
