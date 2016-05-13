module.exports = function($scope, $resource) {
    $scope.error = '';
    $scope.errorModalControl = {};

    $scope.$on('error', function(response) {
        $scope.error = response.data.error || response.data;
        $scope.errorModalControl.show();
    });

    var profileUrl = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/profile';
    var hpId = sessionStorage.getItem("medicloud_hp_id");

    $scope.profile = $resource(profileUrl, {
        hpId: hpId 
    }).get();

    $scope.signout = function() {
       sessionStorage.clear();
       window.location.href = "/sign-in/";
    }

}
