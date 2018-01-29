(function () {
    'use strict';

    angular
        .module('app')
        .directive('grid', grid);

    var sortFunc = {
        asc: function (left, right) {
            if (left === right) {
                return 0;
            }

            return left < right ? -1 : 1;
        },
        desc: function (left, right) {
            if (left === right) {
                return 0;
            }

            return left > right ? -1 : 1;
        }
    };

    function grid() {
        function link($scope, element, attrs) {
            $scope.$watch('source', function (source) {
                if (!$scope.source || !angular.isArray($scope.source) || !$scope.source.length) {
                    delete $scope.grid;
                    return;
                }

                $scope.grid = {
                    columns: Object.getOwnPropertyNames($scope.source[0]).map(function (name) {
                        return {
                            name: name
                        }
                    }),
                    items: $scope.source,
                    sort: []
                };
            });

            $scope.toogleSort = function (colName) {
                var colInfo = $scope.grid.columns.filter(function (col) {
                    return col.name === colName
                })[0];
                colInfo.sortDirection = !colInfo.sortDirection ?
                    'asc' :
                    colInfo.sortDirection === 'asc' ? 'desc' : 'asc';
                var currentSortItem = $scope.grid.sort.filter(function (item) {
                    return item.name === colName
                });

                if (currentSortItem.length > 0) {
                    $scope.grid.sort.splice($scope.grid.sort.indexOf(currentSortItem[0]), 1);
                }

                $scope.grid.sort.push({
                    name: colInfo.name,
                    direction: colInfo.sortDirection
                });

                $scope.grid.items.sort(function (left, right) {
                    for (var i = $scope.grid.sort.length - 1; i >= 0; i--) {
                        var result = sortFunc[$scope.grid.sort[i].direction](left[$scope.grid.sort[i].name], right[$scope.grid.sort[i].name]);
                        if (result !== 0){
                            return result;
                        }
                    }

                    return 0;
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