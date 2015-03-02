var jumbotron = {};


function User(username, password, phone, address) {
    this.username = username;
    this.password = password;
    this.phone = phone;
    this.address = address;
}

var cameronTestUser = new User("cameron", "777777", "555-555-5555", "123 St.");
//console.log(cameronTestUser);


jumbotron.view = function(ctrl) {
    return m("div", [
        m("div", {class:"container"}, [
            m("div", {class:"jumbotron"}, [
                m("center", [
                    m("h1", "Quack"),
                    m("p", "Welcome to LittleDucklingGames.com."),/*end paragraph*/
                    m("a", {class:"btn btn-default", href:"#loginModal",style: "margin-right:10px","data-toggle":"modal"}, "Login"),
                    m("a", {class:"btn btn-primary", href:"#createAccount", "data-toggle":"modal"}, "Create Account"),
                ])//end center
            ])//end jumbotron
        ])//end container

    ]);//end jumbotron div
};//end

jumbotron.controller = function() {};

m.module(document.body, jumbotron);