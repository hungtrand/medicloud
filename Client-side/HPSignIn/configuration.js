function configuration($routeProvider, $resourceProvider) {
	/* config navigation*/
	$routeProvider

		// route to dashboard
		.when('/', {
			templateUrl : 'SignInForm/form.html',
			controller	: 'signInFormCtrl'
		});

	/* config ngResource for REST API*/
}