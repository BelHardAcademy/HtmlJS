(function () {
    'use strict'

    angular
        .module('app')
        .factory('blogService', blogService);

    blogService.$inject = ['$http']

    function blogService($http) {
        var service = {
            getBlogItems: function (successCallback) {
                $http({
                        url: appSettings.baseApiUrl + 'blog-items',
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