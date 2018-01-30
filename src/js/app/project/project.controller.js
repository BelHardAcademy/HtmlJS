(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectController', projectController);

    projectController.$inject = ['$scope', 'projectService'];

    function projectController($scope, projectService) {
        $scope.source = {
			load: function (filter) {
				projectService.getProjects(filter, function (data) {
					$scope.source.items = data.items;
					$scope.source.totalCount = data.totalCount;
				});
			}
		}
    }
})();