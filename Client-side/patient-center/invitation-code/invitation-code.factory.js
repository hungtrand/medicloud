module.exports = function($resource) {
    var url = "http://" + window.location.hostname + ":8080/api/patient/:personId/invitation-code";
    var personId = sessionStorage.getItem("medicloud_person_id");
 
    var invitationCodeClass = $resource(url, {
        personId: personId
    },
    {
        generate: { method: 'PUT' }
    });

    invitationCodeClass.prototype.invitationCode = null;
    invitationCodeClass.prototype.getInvitationCode = function() {
        return this.invitationCode;
    }; 

    return invitationCodeClass;
}
