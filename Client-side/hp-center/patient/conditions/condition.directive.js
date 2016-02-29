function condition_dir() {
	var controller = function($scope) {
		$scope.formatDate = function(d) {
			return new Date(d);
		}
	}

	return {
		templateUrl: "patient/conditions/condition.template.html",

		scope: {
			condition: "=condData"
		},

		link: function() {

		},

		controller: ['$scope', controller]
	}
}