function verification_serv($resourceProvider, $rootScope, $location) {
	var model = function() {
		this.email = $location.search().email;
		this.token = $location.search().token;
	}

	model.prototype = {
		constructor: this,

		verify: function() {
			var that = this;

			if (!that.email || !that.token) {
				$rootScope.$broadcast('verification.failed');
				return false;
			}
			
			var resourceLoc = 'http://'+window.location.host+'\\:8080/HPSignUp/verify/:email/:token';
			var resource = $resourceProvider(resourceLoc, { email: '@email', token: '@token' });
			resource.get(
				{ email: that.email, token: that.token }, 
				function(response) {
					if (response.success) {
						$rootScope.$broadcast('verification.verified');
					} else if (response.message == 'eof') {
						$rootScope.$broadcast('verification.failed');
					} else if (response.message == 'duplicate') {
						$rootScope.$broadcast('verification.duplicate');
					} else {
						$rootScope.$broadcast('verification.failed');
					}
				},
				function(response) {
					$rootScope.$broadcast( 'signup.failed' );
					console.log(response);
				}
			);
		}
	}

	return new model;
}