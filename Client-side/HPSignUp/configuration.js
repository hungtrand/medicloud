function configuration($routeProvider, $resourceProvider) {
	/* config navigation*/
	$routeProvider

		// route to dashboard
		.when('/', {
			templateUrl : 'SignUpForm/form.html',
			controller	: 'signUpFormCtrl'
		})
		.when('/confirmation', {
			templateUrl : "SignUpForm/confirmation.html"
		})
		.when('/verification', {
			templateUrl : "Verification/confirmation.html",
			controller : 'verificationCtrl'
		})
		.when('/security', {
			templateUrl : "AccountSetup/securitySetupForm.html",
			controller : 'securityCtrl'
		});

	/* config ngResource for REST API*/
}