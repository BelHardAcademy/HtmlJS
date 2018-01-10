(function () {
    'use strict';

    angular
        .module('app')
        .controller('galleryController', galleryController);

    galleryController.$inject = ['$scope', 'galleryService']

    function galleryController($scope, galleryService) {
        galleryService.getGallery(function (gallery) {
            $scope.gallery = gallery;
            $scope.modal = function (e) {
                var $current = $(e.currentTarget);
                $current.modal({
                    onRenderContent: renderContent
                });

                function renderContent($content) {
                    var $title = $('<h2/>').text($content.attr('alt'));
                    var $arrowLeft = $('<div id="arrowLeft"/>')
                        .click(function () {
                            updateContent($current.prev());
                        })
                        .append($('<i class="fa fa-arrow-left"/>'));

                    var $arrowRight = $('<div id="arrowRight"/>')
                        .click(function () {
                            updateContent($current.next());
                        })
                        .append($('<i class="fa fa-arrow-right"/>'));

                    updateContent($current);

                    return $('<div/>')
                        .append($title)
                        .append($('<div class="modalContent">')
                            .append($arrowLeft)
                            .append($content)
                            .append($arrowRight));

                    function updateContent($newElement) {
                        if (!$newElement.length) {
                            return;
                        }

                        $current = $newElement;
                        $content.attr('src', $current.attr('data-original-src'))
                        $title.text($current.attr('alt'));
                        toggleArrows();
                    }

                    function toggleArrows() {
                        if (!$current.prev().length) {
                            $arrowLeft.hide();
                        } else {
                            $arrowLeft.show();
                        }

                        if (!$current.next().length) {
                            $arrowRight.hide();
                        } else {
                            $arrowRight.show();
                        }
                    }
                }
            };
        })
    }

})();