$(document).ready(function () {
    $.ajax('https://my-json-server.typicode.com/BelHardAcademy/HtmlJS/gallery-photos', {
        method: 'GET',
        success: function (response) {
            var template = $("#galleryTemplate").html();
            var html = Mustache.render(template, {
                gallery: [{album:'dsf', photos:[{}, {}]}]
            });
            $('#gallery').append(html);
            $('#gallery .images img').click(function () {
                var $current = $(this);
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
            });
        }
    })    
});