module.exports = function ($resource) {
    var url = 'http://'+window.location.hostname+':8080/api/patient/signup/:email/:token';
    var service = $resource(
            url,
            {
                email: "@email",
                token: "@token"
            },
            {
                verify: { method: 'GET' },
                signup: { method: 'POST' }
            }
            );

    return service;
}
