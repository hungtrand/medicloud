module.exports = function($resource, $rootScope, $route, $routeParams) {
	var hpId = sessionStorage.getItem("medicloud_hp_id");
	var url = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/patients/:patientId';
	var client = $resource(url, {
		hpId: hpId,
		patientId: '@patientId'
	});

	var url_cond = url + "/conditions/:conditionId";
	var cond_client = $resource(url_cond, { hpId: hpId, patientId: '@patientId', conditionId: '@conditionId' });

	var patient = function(patientId) {
		this.patientId = patientId;
		this.onLoadCallback = angular.noop;
		this.onFailureCallback = angular.noop;
		this.conditions = [];
		this.observations = [];
		this.fetch();
	}

	patient.prototype = {
		constructor: patient,

		onLoad: function(callback) {
			this.onLoadCallback = callback;
		},

		onFailure: function(callback) {
			this.onFailureCallback = callback;
		},

		fetch: function() {
			var self = this;

			var promise = client.get({
				patientId: self.patientId
			}, function(response, headers) {
				angular.extend(self, response);
				self.onLoadCallback.call(self, response);
			}, function(response) {
				$rootScope.$broadcast('error', response);
				self.onFailureCallback.call(self, response);
			});

			return promise;
		},

		fetchConditions: function() {
			var self = this;

			self.conditions = [];

			var promise = cond_client.query(
				{ patientId: self.patientId}
				, function(response) {
					angular.extend(self.conditions, response);
				}
				, function(response) {
					$rootScope.$broadcast('error', response);
				})

			return promise;
		}
	}

	return patient;
}