module.exports = function ($resource, profile_factory, hpList_factory, 
                            encounterList_factory, activeConditionList_factory) {
    var personId = sessionStorage.getItem("medicloud_person_id");
    var model = {
        profile: profile_factory.get(),
        saveProfile: function(formProfile) {
            var self = this;

            var newProfile = profile_factory.save(formProfile)
            newProfile.$promise.then(function(response) {
                    newProfile.birthdate = new Date(newProfile.birthdate + " 00:00:00");
                    angular.copy(newProfile, self.profile);
                });

            return newProfile.$promise;
        },

        hpList: hpList_factory.query(),

        encounterList: encounterList_factory.query(),

        activeConditionList: activeConditionList_factory.query()
    }

    // initialization
    model.profile.$promise.then(
        function() {
            model.profile.birthdate = new Date(model.profile.birthdate + " 00:00:00");
        }
    );

    return model;
}
