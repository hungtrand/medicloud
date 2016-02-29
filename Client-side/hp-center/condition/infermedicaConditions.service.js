function infermedicaConditions_serv($resource, $rootScope) {
	var url_list = 'http://'+window.location.hostname+'\\:8080/conditions';
	var url_single = 'http://'+window.location.hostname+'\\:8080/conditions/:condition_id';

	var client = $resource(url_single, { condition_id: '@c_id'});
	var service = {
		data: {}
		
		, fetchAll: function(fnSuccess, fnFailure) {
			this.data = client.query({}, fnSuccess);
			$rootScope.$broadcast('infermedicaConditions_serv.data.updated');

			return this;
		}
	}

	return service.fetchAll();
}