(function() {
	var timerStart = Date.now();

	/***************** Loading dependencies *******************/
	var scripts = [
		"route.js"
	];

	var loaded = [];
	var failed = [];
	var count = scripts.length;

	var loadDependencies = function() {
		if (scripts.length === 0) return;

		var url = scripts.pop();
		$
			.getScript(
				url,
				function(data, textStatus, jqxhr) {
					console.log('Loaded ' + url);
					loaded.push(url);
				})
			.fail(function(jqxhr, settings, exception) {
				console.log("***Error***: Failed to load " + url);
				failed.push(url);
				console.log(exception);
				console.log(settings);
				if (jqxhr.status == '404') {
					alert("Connection error. Server or internet connection problem.");
				}
			});

		loadDependencies();
	}
	loadDependencies();
	console.log('Dependencies loading time: ' + (Date.now() - timerStart));

	/********************** End of loading dependencies *******************/

	/********************** Initialize application ************************/
	var init = function() {
		if (loaded.length < count) {
			setTimeout(init, 100);
			return false;
		};

		console.log("*** Initializing application...");
		var app = new angular.module("hp-center", ['ngRoute']);

		// routing and navigation configuration
		app
			.config(['$routeProvider', route]);

		// directives
		

		// services and factories
		
		// controllers

		// initiate
		angular.bootstrap(window.document, ['hp-center']);

		console.log('*** Finished loading. Application loading time: ' + (Date.now() - timerStart));
	}

	init();
})();