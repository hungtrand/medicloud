module.exports = function($resource) {
    var url = "http://" + window.location.hostname + ":8080/api/patient/:personId/encounters";
    var personId = sessionStorage.getItem("medicloud_person_id");
 
    return $resource(url, {
        personId: personId
    });
}
