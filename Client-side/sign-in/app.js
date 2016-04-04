(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./configuration":2,"./main.controller":3,"./models.service":4,"./sign-in-form/signInForm.directive":6,"./signIn.service":7}],2:[function(require,module,exports){
module.exports = function($route) {
    /* config navigation*/
    $route
	.when('/', {
	    templateUrl : 'sign-in-form/form.html'
	})
	.otherwise({
	    redirectTo: '/'
	})
    ;
}

},{}],3:[function(require,module,exports){
module.exports = function($scope, models) {

}

},{}],4:[function(require,module,exports){
module.exports = function($resource) {
    var models = {};
    var service = {};


    return service;
} 

},{}],5:[function(require,module,exports){
module.exports = function($scope, models, signInService) {
    $scope.signin = function() {
	console.log('sign in ...');
    }
}

},{}],6:[function(require,module,exports){
module.exports = function() {
    var controller = require("./signInForm.controller");

    return {
	link: function($scope, $element, $attr) {
	    console.log('sign in form directive initialized');
	}
	, controller: ["$scope", "models_service", "signIn_service", controller]
    };
}

},{"./signInForm.controller":5}],7:[function(require,module,exports){
module.exports = function($models, $resoure) {
	return {};
}

},{}]},{},[1]);
