module.exports = function($resource, $rootScope) {
	var url = "http://" + location.host + '/condition/:condition_id';

	var client = $resource(url, { condition_id: '@id' }, 
		{
			insert: { method: "POST" }
		});

	return client;
}