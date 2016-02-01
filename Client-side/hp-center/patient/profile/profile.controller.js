function profileController($scope, $profileService) {
	$scope.personal = $profileService.data.personal;
	$scope.encounters = $profileService.data.encounters;
}