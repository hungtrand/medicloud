function securitySetupForm_dir(securityServ) {
	return {
		restrict: 'A',
		link: function( scope, element, attrs ) {
			element.bind('submit', function(e) {
				e.preventDefault();
				
				securityServ.save();
			});
		}
	}
}