function signUpForm_ctrl($scope, signUpServ) {
	/* States: success, warning, error, default, waiting */
	$scope.state = "default";
	$scope.response = '';
	$scope.model = signUpServ;

	$scope.$on('signup.submitting', function(ev) {
		$scope.state = 'waiting';
	});

	$scope.$on('signup.success', function(ev) {
		$scope.state = 'success';
		window.location.href='#/confirmation';
	});

	$scope.$on('signup.duplicate', function(ev) {
		$scope.state = 'warning';
		$scope.response = 'Account already exists. Please sign in.';
	});

	$scope.$on('signup.failed', function(ev) {
		$scope.response = 'An error has occurred  or connection could not be established. Please try again later.';
		$scope.state = 'error';
	});

	$scope.resetState = function() {
		$scope.state = "default";
		$scope.response = '';
	}
}