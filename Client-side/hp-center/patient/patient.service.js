module.exports = function($resource, $rootScope) {
	var url = 'http://'+window.location.hostname+'\\:8080/api/hp/:hpId/patients/:patientId';
	var client = $resource(
		url, {
			patientId: '@id'
		}
	);

	return {
		data: { contact_info: {}, encounters: [], notes: [] },
		fetch: function() {
			var self = this;

			client.get({
				patient_id: 1
			}, function(response, headers) {
				self.data = response;
				$rootScope.$broadcast('patient_service.data.updated');
			}, function(response) {
				console.log(response);
			});
		}
	}
}