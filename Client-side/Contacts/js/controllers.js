app.controller('patientsListController', function($scope) {
  $scope.test = "testing12";
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
});
