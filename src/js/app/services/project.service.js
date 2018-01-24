(function () {
    'use strict'

    angular
        .module('app')
        .factory('projectService', projectService);

    projectService.$inject = ['$http', '$rootScope']

    function projectService($http, $rootScope) {
        var service = {
            getProjects: function (successCallback) {
                $http({
                        url: $rootScope.appSettings.baseApiUrl + 'project',
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