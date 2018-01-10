(function () {
    'use strict'

    angular
        .module('app')
        .directive('modal', modal);

    function modal() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    var target = element;
                    if (attrs.target) {
                        target = '#' + attrs.target;
                    }

                    $(target).modal({ onRenderContent: attrs.render });
                    return false;
                });
            }
        }
    }
})();