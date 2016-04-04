module.exports = function($route) {
    /* config navigation*/
    $route
	.when('/', {
	    templateUrl : 'sign-in-form/form.html'
	})
	.otherwise({
	    redirectTo: '/'
	})
    ;
}
