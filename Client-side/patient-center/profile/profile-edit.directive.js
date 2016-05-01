module.exports = function() {
    return {
        templateUrl: "profile/profile-edit.html",
        link: function($scope, $element, $attrs) {
            angular.copy($scope.profile, $scope.formData);
        }
    }
}
