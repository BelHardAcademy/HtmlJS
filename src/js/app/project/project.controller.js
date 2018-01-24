(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectController', projectController);

    projectController.$inject = ['$scope', 'projectService'];

    function projectController($scope, projectService) {
        projectService.getProjects(function (data) {
            $scope.projects = data;
        });
    }
})();