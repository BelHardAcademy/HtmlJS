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
            $scope.$watch('source', function(newValue){
                if (newValue){
                    newValue.goToPage(0);
                }
            });
        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/app/directives/grid.directive.html',
            scope: {
                source: '=',
                filter: '&'
            },
            link: link
        }
    }
})();