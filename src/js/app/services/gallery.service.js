(function () {
    'use strict'

    angular
        .module('app')
        .factory('galleryService', galleryService);

    galleryService.$inject = ['$http']

    function galleryService($http) {
        var service = {
            getGallery: function (successCallback) {
                $http({
                        url: appSettings.baseApiUrl + 'gallery-photos',
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