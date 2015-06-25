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
        m("#fb-root"),
        m(".container", [
            m("p.navbar-text.pull-left", "Site by Cameron Cooks"),
            m("a.twitter-share-button.pull-right.navbar-btn", {href: "https://twitter.com/share", "data-url": "https://www.littleducklinggames.com"}, "Tweet"),
            m(".fb-share-button.pull-right.navbar-btn", {style: "margin-right: 5px;", "date-href": "https://www.littleducklinggames.com", "data-layout": "button_count"})
        ])
    ])
};

footer.controller = function() {
    //twitter button
    !function(d,s,id){
        var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
        if(!d.getElementById(id)){
            js=d.createElement(s);
            js.id=id;js.src=p+'://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js,fjs);
        }
    }(document, 'script', 'twitter-wjs');

    //facebook button
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
};