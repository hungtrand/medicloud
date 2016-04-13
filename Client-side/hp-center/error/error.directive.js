module.exports = function() {
	return {
		scope: {
			error: "="
			, control: "="
		}
		, templateUrl: 'error/error.template.html'
		, link: function($scope, $element, $attrs) {
			var modal = $($element[0]).modal('hide');
			$scope.control = {
				isShown: false
				, show: function(err) {
					$scope.error = err || $scope.error;
					modal.modal('show');
					modal.on('modal.bs.shown', function() {
						$scope.isShown = true;
					});
				}
				, hide: function() {
					modal.modal('hide');
					moda.on('modal.bs.hidden', function() {
						$scope.isShown = false;
					});
				}
			}
		}
	}
}