(function () {
    'use strict';

    angular
        .module('app')
        .directive('gallery', magnificGallery);

    function magnificGallery() {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attrs){
                $(element).magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: 'Подождите #%curr%...',
                    mainClass: 'gallery-container',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true
                    },
                    image: {
                        titleSrc: function(item) {
                            return item.el.attr('alt');
                        }
                    }
                });
            }
        }
    }
})();