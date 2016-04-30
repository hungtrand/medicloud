module.exports = function configuration($routeProvider, $resourceProvider) {
    /* config navigation*/
    $routeProvider
        .when('/:email', {
            templateUrl: './patientSignUp.html',
            controller: 'patientSignUpController'
        });
    /* config ngResource for REST API*/
}
