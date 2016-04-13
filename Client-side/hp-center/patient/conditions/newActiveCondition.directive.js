module.exports = function() {
	var controller = function($scope, models_service) {
		$scope.mode = 'search'; // search, create, or confirm

		$scope.formatDate = function(d) {
			if (!d) return 'none';
			return new Date(d);
		}

		$scope.showSearch = function() {
			$scope.mode = 'search';
		}

		$scope.save = function() {
			models_service.addActiveCondition($scope.condition.name, $scope.condition.severity, $scope.condition.description, $scope.condition.infer_c_id);
		}

		$scope.cancel = function() {
			($scope.onCancelled || angular.noop)();
		}


		$scope.severityOptions = ['mild', 'moderate', 'severe'];
		$scope.create = function(suggestion) {
			if (suggestion) {
				$scope.condition.name = suggestion.name;
				$scope.condition.severity = suggestion.severity;
				$scope.condition.infer_c_id = suggestion.id;
				$scope.condition.description = "";
			}
			
			$scope.mode = "create";
			setTimeout(function() {
				$scope.$apply();
			}, 200);
		}
	}

	return {
		templateUrl: 'patient/conditions/newActiveCondition.template.html',

		scope: {
			condition: "=condData",
			onSaved: "&",
			onCancelled: "&"
		},

		link: function($scope, $element, $attrs) {
			$scope.condition.name = '';
			$scope.condition.severity = '';
			$scope.condition.infer_c_id = null;
			$scope.condition.description = '';

			$scope.confirm = function() {
				$scope.mode = "confirm";
			}

		},

		controller: ['$scope', 'models_service', controller]
	}
}