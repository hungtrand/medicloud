module.exports = function($resource, $rootScope, $route, $routeParams) {
	var url = 'http://'+window.location.hostname+'\\:8080/api/hp/:hpId/patients/:patientId';
	var hpId = sessionStorage.getItem("medicloud_hp_id");

	var client = $resource(
		url, {
		    hpId:hpId
		    , patientId: '@pId'
		}
	);
        
        // return instance of service
	return {
		data: { contact_info: {}, encounters: [], notes: [] },
		fetch: function() {
			var self = this;

			client.get({
				patientId: $routeParams['patient_id']
			}, function(response, headers) {
				self.data = response;
				$rootScope.$broadcast('patient_service.data.updated');
			}, function(response) {
				console.log(response);
			});
		}
	}
}
