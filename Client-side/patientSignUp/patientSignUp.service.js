module.exports = function ($http, $resource) {
	var service = {
		patientSignUp: function(patient) {
			var client = $resource('http://'+window.location.hostname+':8080/user/patientSignUp');
			client.save(patient);
		}
	}
	return service;
}