module.exports = function() {
    var controller = function($scope, invitationCode_factory) {
        $scope.show = false;
        $scope.loading = true;
        $scope.invitationCode = invitationCode_factory.get();
        
        $scope.invitationCode.$promise.then(
            function() {
                $scope.loading = false;
            },
            function(failure) {
                $scope.error = failure.data.error || failure.data.message || failure.data
                                || failure.error || failure.message || failure;
            }
        )
        
        $scope.generateNewCode = function() {
            $scope.loading = true;
            $scope.invitationCode
                .$generate()
                .then(function(response) {
                    $scope.loading = false;
                });
        }

    }

    return {
        templateUrl: '/patient-center/invitation-code/invitation-code.template.html',
        link: function($scope, $element, $attrs) {
            $element.find('[data-toggle="tooltip"]').tooltip(); 
        },
        controller: ['$scope', 'patientCenter_invitationCode_factory', controller]
    }
}
