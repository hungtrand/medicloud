function security_serv($resourceProvider, $rootScope, $location) {
	/* private properties*/
	var onSuccess;
	var onFailure;

	/* public model properties*/
	var model = function() {
		this.username = '';
		this.password = '';
		this.confPassword = '';
		this.email = $location.search().email;
		this.token = $location.search().token;

		this.error;
		this.serverMsg;
	}

	/* mehthods to manipulate the model */
	model.prototype = {
		constructor: this,

		save: function() {
			var that = this;
			$rootScope.$broadcast( 'security.submitting' );

			var resourceLoc = 'http://'+window.location.hostname+'\\:8080/HPSignUp/accountSetup/:email/:token';
			var pathVar = {
				email: that.email,
				token: that.token
			}
			var postData = {
				username : that.username,
				password : that.password,
				email	 : that.email
			}
			var resource = $resourceProvider(resourceLoc, pathVar);

			resource.save(
				postData, 
				function(response) {
					if (response.success) {
						$rootScope.$broadcast( 'security.success' );
						if (response.message) that.serverMsg = response.message;
					} else if (response.message == 'eof') {
						$rootScope.$broadcast( 'security.invalid' );
					} else if (response.message == 'duplicate') {
						$rootScope.$broadcast( 'security.duplicate');
						if (response.error) that.error = response.error;
						if (response.message) that.serverMsg = response.message;
					} else {
						$rootScope.$broadcast( 'security.failed');
						if (response.error) that.error = response.error;
						if (response.message) that.serverMsg = response.message;
					}
				},
				function(response) {
					$rootScope.$broadcast( 'security.failed' );
					console.log(response);
				}
			);
			
		}, 

		then: function(successCallback, failureCallback) {
			if (typeof successCallback == 'function')
				onSuccess = successCallback;
			else
				coonsole.log('callback must be a function.');

			// no warning for onFailure because it's optional
			if (typeof failureCallback == 'function')
				onFailure = failureCallback;
		}
	}
	
	return new model;
}