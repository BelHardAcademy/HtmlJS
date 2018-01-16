(function () {
    'use strict'
    var lastId = 1000;
    angular
        .module('app')
        .factory('contactService', contactService);

    contactService.$inject = ['$http', '$rootScope']

    function contactService($http, $rootScope) {
        var service = {
            send: function (message, successCallback) {
                var data = Object.assign({
                    id: lastId++
                }, message);
                $http({
                        url: $rootScope.appSettings.baseApiUrl + 'messages',
                        method: 'POST',
                        data: data
                    })
                    .then(function (response) {
                        successCallback(response.data);
                    })
            }
        };

        return service;
    }
})();