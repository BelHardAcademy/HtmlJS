(function () {
    'use strict'

    angular
        .module('app')
        .directive('ngVideo', video);

    function video() {
        return {
            restrict: 'E',
            scope: {
                currentTime: '=',
                sources: '=',
                onEnded: '&',
                control: '='
            },
            replace: true,
            templateUrl: '/js/app/directives/ngvideo.directive.html',
            link: function (scope, element, attrs) {
                element[0].currentTime = scope.currentTime || 0;
                
                var control = scope.control || {};
                control.reset = function () {
                    element[0].currentTime = 0;
                    element[0].play();
                }

                element[0].onended = function () {
                    scope.onEnded();
                };

                element[0].ontimeupdate = function () {
                    scope.currentTime = element[0].currentTime;
                    scope.$apply();
                };
            }
        }
    }
})();