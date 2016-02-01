function infermedica_service($resourceProvider) {
	/************************ Private properties *********************************/
	var authenticationHeaders = {
		Accept: 'application/json',
		app_id: 'b08be82d',
		app_key: 'ae593781f3eaa8ab1753db3a7c6a77d1'
	}

	var conditionsResource = $resourceProvider(
		"https://api.infermedica.com/v2/conditions/:condition_id",
		{ condition_id: @infer_cond_id },
		{ headers: authenticationHeaders });
	/*********************** End of Private Properties ***************************/
	

	/************************ public properties and methods **********************/
	var service = {
		 conditions: function(infer_cond_id) {
		 	var data = typeof infer_cond_id === 'undefined' ? {} : { condition_id: infer_cond_id };  
	 		conditionsResource.get(
	 			data,
	 			function(response) {
	 				console.log(response);
	 			},
	 			function(response) {
	 				console.log(response);
	 			});
		 }
	}
	/********************** end of public properties and methods ******************/

	/***** return service *****/
	return service;
}