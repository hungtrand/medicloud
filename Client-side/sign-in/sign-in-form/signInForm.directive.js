module.exports = function() {

	return {
		link: function($scope, $element, $attr) {
			$scope.submit = function() {
				
				$scope.signin();
			}
		}
		,
		controller: "signin_controller"
	}
}