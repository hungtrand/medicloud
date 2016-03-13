function newCondition_dir() {
	var controller = function($scope, condition_fact) {
		$scope.mode = 'search';
		$scope.model = { suggestion: null };

		$scope.formatDate = function(d) {
			if (!d) return 'none';
			return new Date(d);
		}

		$scope.showSearch = function() {
			$scope.mode = 'search';
		}

		$scope.save = function() {
			$scope.waiting = true;
			var data = {
				name: $scope.condition.name
				, severity: $scope.condition.severity
				, infer_c_id: $scope.condition.id
			}
			condition_fact.insert({ condition_id: 0 }, data);
		}

		$scope.cancel = function() {
			$scope.$emit('newCondition.cancel', $scope.condition);
		}

		$scope.severityOptions = ['mild', 'moderate', 'severe'];

		$scope.$watch('model.suggestion', function(newVal) {
			angular.extend($scope.condition, newVal);
			if ($scope.model.suggestion) {
				$scope.mode = 'confirm';
			}
			
		}, true);
	}

	return {
		templateUrl: 'patient/conditions/newActiveCondition.template.html',
		
		scope: {
			condition: "=condData"
		},

		link: function() {

		}, 

		controller: ['$scope', 'condition_fact', controller]
	}
}