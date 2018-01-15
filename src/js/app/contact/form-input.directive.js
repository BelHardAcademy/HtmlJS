(function () {
    'use strict'

    angular
        .module('app')
        .directive('formInput', formInput);

    function formInput() {
        return {
            restrict: 'E',
			templateUrl: '/js/app/contact/form-input.directive.html',
			scope: {
				name: '@',
				label: '@title',
				type: '@',
				value: '=',
				placeholder: '@'
			},
			replace: true,
            link: function (scope, element, attrs) {
                
            }
        }
    }
})();