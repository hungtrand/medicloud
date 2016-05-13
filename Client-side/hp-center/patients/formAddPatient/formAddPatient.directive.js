module.exports = function() {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            submit: '=',
            error: '=',
            waiting: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {

            scope.$watch('show', function(newValue) {
                if (newValue) {
                    $(element[0]).modal('show');
                } else {
                    $(element[0]).modal('hide');
                }
            });
            /*element.find('#AddPatient').on('click', function() {
              element.submit();
            });*/
            element.on('submit', function(){
                var elements = element[0].querySelectorAll('input,select,textarea');
                for (var i = elements.length; i--;) {
                    elements[i].addEventListener('invalid', function() {
                        this.scrollIntoView(false);
                    });
                }
               console.log(scope.checked);
               if (scope.checked == false) {
               var data = scope.patient;
               data = angular.extend({}, scope.patient);
               data.birthdate = element.find('[type=date]').val();
               scope.submit(data);
             }
             else {
               scope.submit(scope.invitationCode);
             }
            });


        },
        templateUrl: 'patients/formAddPatient/formAddPatient.html',
        controller: ['$scope', '$rootScope', function($scope, $rootScope) {
          $scope.checked = false;
          $('[data-toggle="tooltip"]').tooltip('disable');
          $scope.patient = {
            firstName: "", lastName: ""
          };
          $scope.newOrExistingPatient = function() {
            console.log("$scope.checked: " + $scope.checked);
            if ($scope.checked) {
              $rootScope.$broadcast('existingPatient');
            }
            else {
              $rootScope.$broadcast('newPatient');
            }
          }
        }],
    };
}
