function newCondition_dir() {
	var controller = function($scope) {
		$scope.mode = 'search';

		$scope.formatDate = function(d) {
			if (!d) return 'none';
			return new Date(d);
		}

		$scope.save = function() {
			$scope.$emit('newCondition.save', $scope.condition);
		}

		$scope.cancel = function() {
			$scope.$emit('newCondition.cancel', $scope.condition);
		}

		$scope.severityOptions = ['LOW', 'MEDIUM', 'HIGH'];
	}

	return {
		templateUrl: 'patient/conditions/newCondition.template.html',
		
		scope: {
			condition: "=condData"
		},

		link: function() {

		}, 

		controller: ['$scope', controller]
	}
}