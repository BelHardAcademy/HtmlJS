(function () {
    'use strict'

    angular
        .module('app')
        .factory('contactService', contactService);

    contactService.$inject = ['$http']

    function contactService($http) {
        var service = {
            send: function (data, successCallback) {
                $http({
                        url: appSettings.baseApiUrl + 'messages',
                        method: 'POST',
					data: Object.assign({
					id: 100
				}, data)
                    })
                    .then(function (response) {
                        successCallback(response.data);
                    })
            }
        };

        return service;
    }
})();