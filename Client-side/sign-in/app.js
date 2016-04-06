(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./configuration":2,"./main.controller":3,"./models.service":4,"./sign-in-form/signInForm.controller":5,"./sign-in-form/signInForm.directive":6,"./signin.factory":7}],2:[function(require,module,exports){
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
module.exports = function($rootScope, signin_factory) {
	var models = {

	}	

	var service = {
		signin: function(form) {
			var result = new signin_factory();
			var promise = result.post(form);

			promise.then(
				function(response) {
					if (response.hasOwnProperty('hpId')) {
						var credentials = window.btoa(form.username + ":" + form.password);
						sessionStorage.setItem("medicloudHealthProfessional", credentials);
 						$rootScope.$broadcast("medicloud.healthprofessional.signin", response);
					}
				}
				,
				function(response) {
					$rootScope.$broadcast("medicloud.healthprofessional.signin", response);
				}
			);

			return promise;
		}
	}

	return service;
}
},{}],5:[function(require,module,exports){
module.exports = function($scope, models) {
    $scope.signin = function() {
		models.signin($scope.form);
    }

    $scope.$on("medicloud.healthprofessional.signin", function(evt, response) {	
    	setTimeout(function() {
    		window.location.href = "/hp-center";
    	}, 2000);
    });
}
},{}],6:[function(require,module,exports){
module.exports = function() {

	return {
		link: function($scope, $element, $attr) {
			$scope.submit = function() {
				
				$scope.signin();
			}
		}
		,
		controller: "signin_controller"
	}
}
},{}],7:[function(require,module,exports){
module.exports = function($resource) {
	var factory = function(form) {
		var url = 'http://'+window.location.hostname+'\\:8080/signin';
		this.client = $resource(url);

	}

	factory.prototype = {
		constructor: factory
		,
		post: function(formInputs) {
			var self = this;

			var promise = self.client.save(formInputs).$promise;

			promise
				.then(
					function(response) { 
						angular.extend(self, response.data);
					}
				);


			return promise;
		}
	}

	return factory;
}

},{}]},{},[1]);
