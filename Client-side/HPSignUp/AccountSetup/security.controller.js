/* TODO: controller to manage the form on security.html */
function security_ctrl($scope, securityServ) {
	/* States: success, warning, error, default, waiting */
	$scope.state = "default";
	$scope.response = '';
	$scope.model = securityServ;
	
	$scope.$on('security.submitting', function(ev) {
		$scope.state = 'waiting';
	});

	$scope.$on('security.success', function() {
		$scope.state = "success";
	});

	$scope.$on('security.failed', function() {
		$scope.state = 'error';
		if (securityServ.error)
			$scope.error = securityServ.error;
		else
			$scope.response = 'Could not verify your account information.';
	});

	$scope.$on('security.duplicate', function() {
		$scope.state = 'error';
		if (securityServ.error)
			$scope.error = securityServ.error;
		else
			$scope.response = 'Username already exists. Please select another username.';
	});

	$scope.$on('security.invalid', function() {
		$scope.state = 'warning';
		$scope.response = 'The credentials provided are no longer valid. Please contact Medicloud to verify your information.';
	});
}