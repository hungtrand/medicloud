module.exports = function ($http, $resource) {
	var service = {
		patientSignUp: function(patientSignUp) {
			var client = $resource('http://'+window.location.hostname+':8080/user/patientSignUp');
			client.save(patientSignUp);
		}
	}
	return service;
}
