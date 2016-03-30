module.exports = function configuration($routeProvider, $resourceProvider) {
	/* config navigation*/
	$routeProvider
		.when('/:email', {
			templateUrl : '/',
			controller	: 'patientSignUpController'
		});
	/* config ngResource for REST API*/
}
