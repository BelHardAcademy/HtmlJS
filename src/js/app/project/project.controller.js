(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectController', projectController);

    projectController.$inject = ['$scope', 'projectService', 'gridService'];

    function projectController($scope, projectService, gridService) {
        $scope.source = new gridService.GridDataSource(function(filter, callback){
            projectService.getProjects(filter, callback);
        });
    }
})();