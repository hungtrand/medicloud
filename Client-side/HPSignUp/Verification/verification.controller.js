function verification_ctrl($scope, verificationServ) {
	/* States: success, warning, error, default, waiting */
	$scope.state = "waiting";
	$scope.response = '';
	$scope.model = verificationServ;

	setTimeout(function() {
		verificationServ.verify();
	}, 2000);
	

	$scope.$on('verification.verified', function() {
		$scope.state = "success";
	});

	$scope.$on('verification.failed', function() {
		$scope.state = 'error';
		$scope.response = 'Could not verify your account information.';
	});

	$scope.$on('verification.duplicate', function() {
		$scope.state = 'warning';
		$scope.response = 'Your account has already been verified.';
	});
}