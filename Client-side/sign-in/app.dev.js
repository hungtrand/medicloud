var signin_module = function() {
    var configuration = require("./configuration");
    var main_controller = require("./main.controller");
    var models_service = require("./models.service");
    var signin_factory = require("./signin.factory");
    var signin_controller = require("./sign-in-form/signInForm.controller");
    var signInForm_directive = require("./sign-in-form/signInForm.directive");

    var app = new angular.module("signin", ['ngRoute', 'ngResource']);

    /* config: navigation and REST API resource provider */
    app
        .config(["$routeProvider", configuration])
    ;

    /* services and models */
    app
        .service("signin_factory", ["$resource", signin_factory])
        .service("models_service", ["$rootScope", "signin_factory", models_service])
    ;

    /* controllers */
    app
        .controller("main_controller", ["$scope", "models_service", main_controller])
        .controller("signin_controller", ["$scope", "models_service", signin_controller])
    ;

    /* directives / views */
    app
        .directive('mcSignInFormDirective', [signInForm_directive])
    ;

}

signin_module();

module.exports = signin_module;