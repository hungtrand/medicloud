module.exports = function ($http, $resource) {
	var service = {
		patientSignIn: function(patient) {
			var client = $resource('http://'+window.location.hostname+':8080/user/patientSignIn');
		}
	}
	return service;
}
