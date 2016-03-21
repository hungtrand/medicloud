module.exports = function() {
    var controller = require("./signInForm.controller");

    return {
	link: function($scope, $element, $attr) {

	}
	, controller: ["$scope", "models_service", "signIn_service", controller]
    };
}
