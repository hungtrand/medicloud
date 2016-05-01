module.exports = function ($scope, model) {
    // initialize models 
    console.log("patient-center: main.controller initiated."); 
    $scope.profile = model.profile;

    $scope.signout = function() {
       sessionStorage.clear();
       window.location.href = "/sign-in/";
    }
}
