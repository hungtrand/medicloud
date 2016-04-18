module.exports = function() {
	return {
		templateUrl: 'patient/observations/addObservationForm.html'
		, scope: {
			control: "="
		}
		, link: function($scope, $element, $attrs) {
			var modal = $($element[0]).find('.modal').modal('hide');
			var btnPickEncounter = $element.find("#btnPickEncounterDate");

			btnPickEncounter.find('input').on('click', function(e) { e.stopPropagation(); });

			// btnPickEncounter.daterangepicker({
			// 		ranges: {
			// 			'Today': [moment(), moment()],
			// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			// 			'2 Days Ago': [moment().subtract(2, 'days'), moment()],
			// 			'3 Days Ago': [moment().subtract(3, 'days'), moment()],
			// 			'A Week Ago': [moment().subtract(3, 'days'), moment()],,
			// 			'A Month Ago': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			// 		},
			// 		startDate: moment().subtract(29, 'days'),
			// 		endDate: moment()
			// 	},
			// 	function(start, end) {
			// 		console.log(start);
			// 		$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
			// 	}
			// );

			$scope.control.show = function() { modal.modal('show'); }
			$scope.control.hide = function() { modal.modal('hide'); }


		}
		, controller: ['$scope', '$filter', 'models_service', function($scope, $filter, models_service) {
			$scope.control = {};
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
		}]
	}
}