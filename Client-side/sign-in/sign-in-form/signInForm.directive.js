module.exports = function() {
    var controller = require("./signInForm.controller");

    return {
	link: function($scope, $element, $attr) {
	    console.log('sign in form directive initialized');
	}
	, controller: ["$scope", "models_service", "signIn_service", controller]
    };
}
