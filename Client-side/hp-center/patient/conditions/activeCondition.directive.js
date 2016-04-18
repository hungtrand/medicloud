module.exports = function() {
	return {
		templateUrl: 'patient/conditions/activeCondition.template.html'
		, scope: {
			activeCondition: "="
		}
		, link: function($scope, $element, $attrs) {

		}
		, controller: ['$scope', function($scope) {

		}]
	}
}