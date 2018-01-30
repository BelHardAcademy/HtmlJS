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
                        var items = response.data;
						if (filterModel && filterModel.sort) {
							response.data.sort(function (left, right) {
								for (var i = filterModel.sort.length - 1; i >= 0; i--) {
									var current = filterModel.sort[i];

									if (left[current.name] !== right[current.name]) {
										return current.direction === 'asc' ?
											left[current.name] < right[current.name] ? -1 : 1 :
											left[current.name] > right[current.name] ? -1 : 1;
									}
								}

								return 0;
							});
						}

						if (filterModel && filterModel.pagging) {
							items = items.slice(filterModel.pagging.current * filterModel.pagging.size, (filterModel.pagging.current + 1) * filterModel.pagging.size);
						}

						successCallback({
							items: items,
							totalCount: response.data.length
						});
                    })
            }
        };

        return service;
    }
})();