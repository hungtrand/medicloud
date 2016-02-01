(function() {
	// this is the main application
	// the object is not initiated until all dependent scripts and modules are loaded
	var scripts = [];

	// if there's any script in array scripts JQuery.getScript to load them
	var status = includeScripts(scripts);

	var hpCenter = {
		timerStart: Date.now(),
		ngModules : ['ngRoute'],
		modules: { 'patientsApp': patients_module, 'patient': patient_module },
		module_ready_count: 0,
		module_ready: function() {
			this.module_ready_count++;
			if (this.module_ready_count === Object.keys(this.modules).length) {
				this.init();
			}
		},

		init: function() {
			if (!status.ready) {
				if (status.timeElapsed % 10000 == 0 && status.timeElapsed > 10000) {
					var conf = confirm('The application takes too long to load. Continue waiting?');
					if (!conf) {
						return false;
					}
				}
				setTimeout(init, 100);
				return false;
			};

			console.log("*** Initializing hp-center application...");

			var allModules = angular.extend([], this.ngModules, Object.keys(this.modules));

			var app = new angular.module("hp-center", allModules);

			// routing and navigation configuration
			app.config(['$routeProvider', function($routeProvider) {
				'use strict';
				$routeProvider
					.when('/', {
						templateUrl: 'dashboard/'
					})
					.otherwise({
						redirectTo: '/'
					});

			}]);

			// directives


			// services and factories

			// controllers

			// initiate
			angular.bootstrap(window.document, ['hp-center']);

			console.log('*** Finished loading hp-center. Application loading time: ' + (Date.now() - this.timerStart));
		}
	}

	// initialize modules. Each module will report back when it's ready by calling this.module_ready()
	// when everything is ready, hpCenter will init()
	angular.forEach(hpCenter.modules, function(fnModule, moduleName) {
		fnModule.call(hpCenter);
	});
})();