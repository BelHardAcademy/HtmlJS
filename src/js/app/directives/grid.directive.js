(function () {
    'use strict';

    angular
        .module('app')
        .directive('grid', grid);

    function grid() {
        function link($scope, element, attrs) {
            $scope.$watch('source', function (source) {
                if (!$scope.source || !angular.isArray($scope.source) || !$scope.source.length) {
                    delete $scope.columns;
                    delete $scope.items;
                    return;
                }

                $scope.columns = Object.getOwnPropertyNames($scope.source[0]);
                $scope.items = $scope.source;
            });

            $scope.toogleSort = function (col) {
                $scope.items.sort(function(left, right){
                    if (left === right){
                        return 0;
                    }
                    
                    return left < right ? -1 : 1;
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