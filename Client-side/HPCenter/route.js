function route($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider

		// route to dashboard
		.when('/', {
			templateUrl : 'Dashboard/index.html'/*,
			controller	: 'dashboard_controller'*/
		});
}