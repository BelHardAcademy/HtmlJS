(function () {
	'use strict';

	angular
		.module('app')
		.directive('grid', grid);

	function grid() {
		function link($scope, element, attrs) {
			$scope.isLoaded = false;
			$scope.grid = {
				sort: [],
				pagging: {
					size: 5,
					current: 0
				}
			};

			$scope.$watch('source.items', function (source) {
				if (!source || !angular.isArray(source)) {
					return;
				}
				
				if (source.length === 0){
					$scope.isEmpty = true;
					return;
				}
				
				$scope.isEmpty = false;

				$scope.grid.items = source;
				if (!$scope.grid.columns) {
					$scope.grid.columns = Object.getOwnPropertyNames(source[0])
						.map(function (name) {
							return {
								name: name
							}
						});
				}
				$scope.grid.pagging.count = Math.ceil($scope.source.totalCount / $scope.grid.pagging.size);
				$scope.isLoaded = true;
			});

			$scope.toogleSort = function (col) {
				var exists = $scope.grid.columns.filter(function (column) {
					return column.name === col;
				});

				exists[0].sort = !exists[0].sort ?
					'asc' :
					exists[0].sort === 'asc' ? 'desc' : 'asc';

				var currentSort = $scope.grid.sort.filter(function (value) {
					return value.name === col;
				});

				if (currentSort && currentSort.length > 0) {
					var index = $scope.grid.sort.indexOf(currentSort[0]);
					$scope.grid.sort.splice($scope.grid.sort.indexOf(currentSort[0]), 1);
				}

				$scope.grid.sort.push({
					name: exists[0].name,
					direction: exists[0].sort
				});

				load();
			}

			$scope.$watch('grid.pagging.size', function () {
				load();
			});

			$scope.goToPage = function(index){
				if (index < 0 || index >= $scope.grid.pagging.count) {					
					return;
				}
				
				$scope.grid.pagging.current = index;
				load();
			}
			
			load();
			
			function load(){
				$scope.isLoaded = false;
				$scope.source.load({
					sort: $scope.grid.sort,
					pagging: $scope.grid.pagging
				});
			}
		}

		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/js/app/directives/grid.directive.html',
			scope: {
				source: '='
			},
			link: link
		}
	}
})();