$(document).ready(function () {
    $('.gallery .images img').click(function () {
        var $current = $(this);
        $current.modal({
            onRenderContent: renderContent
        });

        function renderContent($content) {
            var $title = $('<h2/>').text($content.attr('alt'));
            return $('<div/>')
                .append($title)
                .append($('<div class="modalContent">')
                    .append($('<div id="arrowLeft"/>')
                        .click(function () {
                            var $prev = $current.prev();
                            if (!$prev.length) {
                                return;
                            }

                            $current = $prev;
                            $content.attr('src', $current.attr('data-original-src'))
                            $title.text($current.attr('alt'));
                        })
                        .append($('<i class="fa fa-arrow-left"/>')))
                    .append($content.attr('src', $content.attr('data-original-src')))
                    .append($('<div id="arrowRight"/>')
                        .click(function () {
                            var $next = $current.next();
                            if (!$next.length) {
                                return;
                            }

                            $current = $next;
                            $content.attr('src', $current.attr('data-original-src'))
                            $title.text($current.attr('alt'));
                        })
                        .append($('<i class="fa fa-arrow-right"/>'))));
        }
    });
});