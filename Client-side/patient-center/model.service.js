module.exports = function ($resource, profile_factory) {
    var personId = sessionStorage.getItem("medicloud_person_id");
    return {
        profile: profile_factory.get({personId: personId}),
        saveProfile: function(formProfile) {
            var self = this;

            var newProfile = profile_factory.save(formProfile)
            newProfile.$promise.then(function(response) {
                    newProfile.birthdate = new Date(newProfile.birthdate + " 00:00:00");
                    angular.copy(newProfile, self.profile);
                });

            return newProfile.$promise;
        }
    }
}
