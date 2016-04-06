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
						sessionStorage.setItem("medicloud_user_credentials", credentials);
						sessionStorage.setItem("medicloud_hp_id", response.hpId);
 						$rootScope.$broadcast("medicloud.healthprofessional.signin", response);
					} else if (response.hasOwnProperty('patientId')) {
						var credentials = window.btoa(form.username + ":" + form.password);
						sessionStorage.setItem("medicloud_user_credentials", credentials);
						sessionStorage.setItem("medicloud_patient_id", response.hpId);
 						$rootScope.$broadcast("medicloud.patient.signin", response);
					}
				}
				,
				function(response) {
					$rootScope.$broadcast("medicloud.signin.error", response);
				}
			);

			return promise;
		}
	}

	return service;
}