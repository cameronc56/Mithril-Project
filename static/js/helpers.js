var helpers = {};
helpers.view = function(ctrl) {};
helpers.controller = function() {};

helpers.inputValidation = function() {
    var me = {};
    me.isAlpha = function(inputToValidate) {
        return (inputToValidate.search(/[^\w*^\d*]/) == -1);
    };
    me.isEmail = function(inputToValidate) {
        return (inputToValidate.search(/[^\w*^\d*^@*^.*^+*]/) == -1);
    };
    me.replaceSpacesWithUnderscores = function(inputToValidate) {
        return inputToValidate.replace(/ /g, "_");
    };
    return me;
};


helpers.cookies = function() {
    var me = {};
    me.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' '){
                c = c.substring(1);
            }
            if (c.indexOf(name) != -1){
                return c.substring(name.length,c.length);
            }
        }
        return "";
    };
    return me;
};

helpers.sort = function() {
    var me = {};
    me.sortByStringProperty = function(property) {
        'use strict';
        return function (a, b) {
            var sortStatus = 0;
            if (a[property] < b[property]) {
                sortStatus = -1;
            } else if (a[property] > b[property]) {
                sortStatus = 1;
            }
            return sortStatus;
        };
    };
    me.sortByIntegerProperty = function(property) {
        'use strict';
        return function (a, b) {
            var sortStatus = 0;
            if (parseInt(a[property]) < parseInt(b[property])) {
                sortStatus = 1;
            } else if (parseInt(a[property]) > parseInt(b[property])) {
                sortStatus = -1;
            }
            return sortStatus;
        };
    };
    return me;
};

helpers.colors = function() {
    var me = {};
    me.goodColor = "#62BF65";
    me.badColor = "#E67373";
    me.greyColor = "#808080";
    return me;
};