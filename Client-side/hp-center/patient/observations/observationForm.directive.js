module.exports = function() {
	return {
		templateUrl: 'patient/observations/addObservationForm.html',
		scope: {
			control: "="
		}
		,
		link: function($scope, $element, $attrs) {
			var modal = $($element[0]).find('.modal').modal('hide');
			var btnPickEncounter = $element.find("#btnPickEncounterDate");

			btnPickEncounter.find('input').on('click', function(e) {
				e.stopPropagation();
			});

			$scope.control.show = function() {
				modal.modal('show');
			}
			$scope.control.hide = function() {
				modal.modal('hide');
			}

		}
		,
		controller: [
			'$scope', '$filter', 'models_service', '$route', '$routeParams'
			, function($scope, $filter, models_service, $route, $routeParams) {
			$scope.control = {};
			$scope.form = {
				encounterDate: '',
				encounterReason: '',
				state: '',
				comments: ''
			}

			$scope.patient = models_service.getPatient($routeParams['patient_id']);

			var initializeBloodhound = function() {
				$scope.suggestions = new Bloodhound({
					datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
					queryTokenizer: Bloodhound.tokenizers.whitespace,
					identify: function(obj) {
						return obj.id;
					},
					local: models_service.getObservationSuggestions
				});

			}

			$scope.setEncounterDate = function(d) {
				var encDate;
				if (typeof d == 'object') {
					encDate = $filter('date')(d, 'shortDate');
				} else if (typeof d == 'number') {
					encDate = new Date();
					encDate.setDate(encDate.getDate() + d);
				} else {
					console.log('Invalid date: ' + d);
					return;
				}

				$scope.form.encounterDate = $filter('date')(encDate, 'shortDate');
			}

			$scope.submitNewObservationForm = function() {
				$scope.patient.addNewObservation($scope.form);
			}
		}]
	}
}