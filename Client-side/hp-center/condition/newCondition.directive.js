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
			condition_fact.insert({ condition_id: 0 }, $scope.condition);
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
		templateUrl: 'condition/newCondition.template.html',
		
		scope: {
			condition: "=condData"
		},

		link: function() {

		}, 

		controller: ['$scope', 'condition_fact', controller]
	}
}