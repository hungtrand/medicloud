module.exports = function($q, $location) {
	return {
		'request': function(config) {
			var credentials = sessionStorage.getItem("medicloudHealthProfessional");
			// console.log("Credentials: " + credentials);
			if (credentials) {
				config.headers.Authorization = 'Basic ' + credentials;
			}

			return config || $q.when(config);
		},
		responseError: function(rejection) {

			console.log("Found responseError: ", rejection);
			if (rejection.status == 401) {

				console.log("Access denied (error 401), please login again");
				//$location.nextAfterLogin = $location.path();
				window.location.href = '/sign-in/';
			}
			return $q.reject(rejection);
		}
	}
}