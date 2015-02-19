var helpers = {};
helpers.view = function(ctrl) {};
helpers.controller = function() {};

helpers.inputValidation = {
    isAlpha: function(inputToValidate) {
        if(inputToValidate.search(/[^\w*^\d*]/) != -1) {
            return false;
        } else {
            return true;
        }
    }
};

