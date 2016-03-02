function conditionSearch_dir() {
	var controller = function($scope, infermedicaConditionsService) {
		$scope.waiting = false;
		$scope.$on("status.waiting", function() {
			$scope.waiting = true;
			setTimeout(function() {
				$scope.$apply();
			}, 10);
		});

		$scope.$on("status.ready", function() {
			$scope.waiting = false;

			setTimeout(function() {
				$scope.$apply();
			}, 10);
		});

		var initializeBloodhound = function() {
			$scope.suggestions = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) { return obj.id; },
				local: infermedicaConditionsService.data.conditions
			});

			$scope.$broadcast('conditionSearch.suggestions.updated');
		}

		if (infermedicaConditionsService.data.conditions) {
			initializeBloodhound();
		}

		$scope.$on('infermedicaConditions_serv.data.updated', function() {
			initializeBloodhound();
		});
	}

	return {
		templateUrl: '/hp-center/condition/conditionSearch.template.html',
		model: '='

		,
		link: function($scope, $element, $attrs) {
			$scope.$on('conditionSearch.suggestions.updated', function() {

				$element.find('.inputSearch').typeahead({
					hint: true,
					highlight: true,
					minLength: 1
				}, {
					name: 'conditions',
					source: $scope.suggestions,
					displayKey: 'name',
					templates: {
						empty: [
							'<div class="text-muted">',
							'No Suggestion',
							'</div>'
						].join('\n'),
						suggestion: function(data) {
							var templ = '<div class="list-group-item">{{data}}</div>';

							return templ.replace(/{{data}}/g, data.name);
						}
					}
				});
			});

		}

		,
		controller: ['$scope', 'infermedicaConditions_serv', controller]
	}
}