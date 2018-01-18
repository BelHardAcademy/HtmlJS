(function () {
    'use strict'

    angular
        .module('app')
        .directive('formInput', formInput);

    function formInput() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/app/directives/form-input.directive.html',
            scope: {
                name: '@',
                value: '=',
                type: '@',
                title: '@',
                placeholder: '@'
            }
        }
    }
})();