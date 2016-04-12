module.exports = function($resource, $rootScope) {
	var url = "http://" + location.host + '/conditions/:condition_id';

	var client = $resource(url, { condition_id: '@id' }, 
		{
			insert: { method: "POST" }
		});

	var activeCondition = function() {
		this.conditionId = null;
		this.name = '';
		this.description = '';
		this.startObs = null
		this.endObs = null;
	}

	activeCondition.prototype = {
		constructor: activeCondition
	}

	return activeCondition;
}