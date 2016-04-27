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
                '$scope', '$filter', 'models_service', 
                '$route', '$routeParams', 'observationSuggestions_factory'
                , function($scope, $filter, models_service, $route, $routeParams, obsSuggestionsFactory) {
                    $scope.error = "";
                    $scope.waiting = false;
                    $scope.control = {};
                    $scope.form = {
                        encounterDate: '',
                        encounterReason: '',
                        state: '',
                        comments: ''
                    }

                    $scope.patient = models_service.getPatient($routeParams['patient_id']);

                    $scope.setEncounterDate = function(d) {
                        var encDate;
                        if (typeof d == 'object' && d != null) {
                            encDate = $filter('date')(d, 'shortDate');
                        } else if (typeof d == 'number') {
                            encDate = new Date();
                            encDate.setDate(encDate.getDate() + d);
                        } else {
                            return;
                        }

                        $scope.form.encounterDate = $filter('date')(encDate, 'shortDate');
                    }

                    $scope.submitNewObservationForm = function() {
                        $scope.waiting = true;
                        $scope.patient
                            .addNewObservation($scope.form)
                            .then(
                                    function(succcess) {
                                        $scope.waiting = true;
                                        $scope.control.hide();	
                                    },
                                    function(failure) { handleError(failure); }
                                 );
                    }

                    $scope.queryObservationSuggestions = function(keywords) {
                        $scope.obsSuggestions = obsSuggestionsFactory.query(
                                { 
                                    keywords: keywords,
                                    gender: $scope.patient.gender || ''
                                });

                        return $scope.obsSuggestions.$promise.then(
                                    function() { return $scope.obsSuggestions; }
                                );
                    }

                    $scope.addToObservationComments = function(sugg) {
                        if ($scope.form.comments) $scope.form.comments += "\n";
                        $scope.form.comments += sugg.label;
                        $scope.selectedObsSuggestion = "";
                    }

                    var handleError = function(failure) {
                        $scope.error = failure.error ? failure.error : failure;

                        $scope.error = angular.isArray($scope.error) ? $scope.error.join("\n") : $scope.error;
                        $scope.waiting = false;
                    }

                }]
    }
}
