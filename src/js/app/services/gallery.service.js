(function () {
    'use strict'

    angular
        .module('app')
        .factory('galleryService', galleryService);

    galleryService.$inject = ['$http', '$rootScope']

    function galleryService($http, $rootScope) {
        var service = {
            getGallery: function (successCallback) {
                $http({
                        url: $rootScope.appSettings.baseApiUrl + 'gallery-photos',
                        method: 'GET'
                    })
                    .then(function (response) {
                        successCallback(response.data);
                    })
            }
        };

        return service;
    }
})();