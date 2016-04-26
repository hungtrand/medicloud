module.exports = function($resource, $rootScope) {
	var url_list = 'http://'+window.location.hostname+'\\:8080/conditions';
	var url_single = 'http://'+window.location.hostname+'\\:8080/conditions/:condition_id';

	var client = $resource(url_list, { condition_id: '@c_id'});
	var service = {
		ready: false,
		data: {
			conditions: []
		}
		
		, fetchAll: function() {
			var self = this;

			var conditions = client.query(
				{}
				, function() {
					self.data.conditions.splice(0, self.data.conditions.length);
					angular.extend(self.data.conditions, conditions);
					$rootScope.$broadcast('infermedicaConditions_serv.data.updated');
					self.ready = true;
				}
				, function(response) {
					$rootScope.$broadcast('infermedicaConditions_serv.data.error', response);
				}
			 );
			
			return client.$promise;
		}
	}

	service.fetchAll();	
	return service;
}