function signUp_serv($resourceProvider, $rootScope) {
	/* private properties*/
	var onSuccess;
	var onFailure;

	/* public model properties*/
	var model = function() {
		this.name = '';
                this.prefix = '';
                this.suffix = '';
                this.title = '';
		this.email = '';
		this.businessName = '';
		this.businessAddress = '';
		this.businessPhone = '';
	}

	/* mehthods to manipulate the model */
	model.prototype = {
		constructor: this,

		save: function() {
			var that = this;
			$rootScope.$broadcast( 'signup.submitting' );

			var resourceLoc = 'http://'+window.location.hostname+'\\:8080/HPSignUp/';
			var postData = {
				name 			: 	this.name,
                                prefix: this.prefix,
                                suffix: this.suffix,
                                title: this.title,
				email 			: 	this.email,
				businessName	: 	this.businessName,
				businessAddress	: 	this.businessAddress,
				businessPhone	: 	this.businessPhone
			}
			var resource = $resourceProvider(resourceLoc);

			resource.save(
				postData, 
				function(response) {
					if (response.success) {
						$rootScope.$broadcast( 'signup.success' );
					} else if (response.message == 'duplicate') {
						$rootScope.$broadcast( 'signup.duplicate');
					} else {
						$rootScope.$broadcast( 'signup.failed');
					}
				},
				function(response) {
					$rootScope.$broadcast( 'signup.failed' );
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
