(function () {
    'use strict'

    angular
        .module('app')
        .factory('blogService', blogService);

    blogService.$inject = ['$http', '$rootScope']

    function blogService($http, $rootScope) {
        var service = {
            getBlogItems: function (successCallback) {
                $http({
                        url: $rootScope.appSettings.baseApiUrl + 'blog-items',
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