function includeScripts(scripts) {
	var timerStart = Date.now();
	var loaded = [];
	var failed = [];
	var count = scripts.length;
	var files = angular.copy(scripts);
	var trackingReceipt = {
		ready: false,
		loaded: 0,
		timeElapsed: 0
	};

	var loadDependencies = function() {
		if (loaded.length + failed.length == count || !angular.isArray(files)) {
			trackingReceipt.ready = true;
			console.log('Dependencies loading time: ' + (Date.now() - timerStart));
			return false;
		}

		var url = files.pop();
		if (typeof url === 'string') {
			$
				.getScript(
					url,
					function(data, textStatus, jqxhr) {
						console.log('Loaded ' + url);
						loaded.push(url);
						trackingReceipt.loaded++;
						trackingReceipt.timeElapsed = Date.now() - timerStart;
					})
				.fail(function(jqxhr, settings, exception) {
					console.log("***Error***: Failed to load " + url);
					failed.push(url);
					console.log(exception);
					console.log(settings);
					trackingReceipt.timeElapsed = Date.now() - timerStart;
					if (jqxhr.status == '404') {
						alert("Connection error. Server or internet connection problem.");
					}
				});
		}


		setTimeout(loadDependencies, 10);
	}
	loadDependencies();

	return trackingReceipt;
}