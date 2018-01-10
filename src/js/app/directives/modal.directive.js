(function(){
    'use strict'

    angular
        .module('app')
        .directive('modal', modal);

    function modal(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.on('click', function(){
                    $(element).modal();
                });
            }
        }
    }
})();