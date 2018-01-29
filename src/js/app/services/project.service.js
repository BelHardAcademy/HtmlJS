(function () {
    'use strict'

    angular
        .module('app')
        .factory('projectService', projectService);

    projectService.$inject = ['$http', '$rootScope']

    function projectService($http, $rootScope) {
        var service = {
            getProjects: function (filterModel, successCallback) {
                $http({
                        url: $rootScope.appSettings.baseApiUrl + 'project',
                        method: 'GET'
                    })
                    .then(function (response) {                        
                        successCallback(filter(response.data, filterModel));
                    })
            }
        };

        return service;
    }

    function filter(data, filterModel){
        return data;
    }
})();