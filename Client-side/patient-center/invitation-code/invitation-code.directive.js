module.exports = function() {
    var controller = function($scope, invitationCode_factory) {
        $scope.show = false;
        var invCodeService = invitationCode_factory.get();
        $scope.code = invCodeService.getInvitationCode();
        $scope.generate = function() {
            invCodeService.$generate();
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
