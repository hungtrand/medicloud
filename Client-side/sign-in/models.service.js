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