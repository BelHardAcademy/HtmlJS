(function () {
    'use strict';

    angular
        .module('app')
        .directive('route', route);

    function route() {
        return {
            require: '^map',
            restrict: 'E',
            scope: {
                points: '='
            },
            link: function (scope, element, attrs, parent) {
                var route = parent.addRoute(scope.points);
                scope.$on('$destroy', function(){
                    parent.removeRoute(route);
                })
            }
        }
    }
})();