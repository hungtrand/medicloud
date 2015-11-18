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
		});

	/* config ngResource for REST API*/
}