function mc_modal_dir() {
	return {
		templateUrl: 'share/modal.template.html',
		scope: {
			show: '=show',
			title: '=mcTitle',
			body: '=mcBody',
			footer: '=mcFooter',
			actions: '=mcActions'
		},
		link: function($scope, $element, $attrs) {

			$scope.$watch('show', function(newVal, oldVal) {
				if (newVal) {
					$element.find('.modal').modal('show');
				} else {
					$element.find('.modal').modal('hide');
				}
			});

			$element.find('.modal').on('shown.bs.modal', function() {
				$scope.show = true;
				$scope.$apply();
			});

			$element.find('.modal').on('hidden.bs.modal', function() {
				$scope.show = false;
				$scope.$apply();
			});
		}
	}
}