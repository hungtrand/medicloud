function route($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'dashboard/'
		})
		.when('/patients/', {
			templateUrl: 'patients/'
		});
}