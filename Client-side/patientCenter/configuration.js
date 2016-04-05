module.exports = function configuration($routeProvider) {
	/* config navigation*/
	$routeProvider
		.when('/', {
			controller	: 'patientCenterController',
      templateUrl: 'patientCenterHome.html'
		})
		.when('/calendar', {
			controller	:	'patientCenterController',
			templateUrl: 'calendar.html'
		});
};
