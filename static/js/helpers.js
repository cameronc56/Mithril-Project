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
    me.sortJsonArrayByProperty = function(objArray, prop, direction){
            if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
            var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending

            if (objArray && objArray.constructor===Array){
                var propPath = (prop.constructor===Array) ? prop : prop.split(".");
                objArray.sort(function(a,b){
                    for (var p in propPath){
                        if (a[propPath[p]] && b[propPath[p]]){
                            a = a[propPath[p]];
                            b = b[propPath[p]];
                        }
                    }
                    // convert numeric strings to integers
                    a = a.match(/^\d+$/) ? +a : a;
                    b = b.match(/^\d+$/) ? +b : b;
                    return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
                });
            }
        };
    //sortJsonArrayByProperty(results, 'attributes.OBJECTID');
    //sortJsonArrayByProperty(results, 'attributes.OBJECTID', -1);
};

helpers.colors = function() {
    var me = {};
    me.goodColor = "#62BF65";
    me.badColor = "#E67373";
    me.greyColor = "#808080";
    return me;
};