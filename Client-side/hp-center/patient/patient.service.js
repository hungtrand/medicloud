function patient_serv($resource, $rootScope) {
	var client = $resource(
		'http://private-be2dd-medicloud2.apiary-mock.com/patient/:patient_id', {
			patient_id: '@id'
		});

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