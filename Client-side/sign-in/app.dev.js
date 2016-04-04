(function() {
    var configuration = require("./configuration");
    var main_controller = require("./main.controller");
    var models_service = require("./models.service");
    var signIn_service = require("./signIn.service");
    var signInForm_directive = require("./sign-in-form/signInForm.directive");
   
    var app = new angular.module("HPSignIn", [ 'ngRoute', 'ngResource' ]);

    /* config: navigation and REST API resource provider */
    app
	.config(["$routeProvider", configuration]);

    /* services and models */
    app
	.service("signIn_service", ["$resource", "$rootScope", signIn_service])
	.service("models_service", ["$rootScope", models_service]);

    /* controllers */
    app
	.controller("main_controller", ["$scope", "models_service", main_controller]);

    /* directives / views */
    app
	.directive('mcSignInFormDirective', [ signInForm_directive]);

})();
