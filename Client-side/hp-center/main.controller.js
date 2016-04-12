module.exports = function($scope) {
	$scope.error = '';
	$scope.errorModalControl = {};

	$scope.$on('error', function(response) {
		$scope.error = response.data.error || response.data;
		$scope.errorModalControl.show();
	});
}