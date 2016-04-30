module.exports = function ($resource, profile_factory) {
    var personId = sessionStorage.getItem("medicloud_person_id");
    return {
        profile: profile_factory.get({personId: personId})
    }
}
