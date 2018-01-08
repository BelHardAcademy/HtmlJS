$(document).ready(function () {
    $.ajax(appSettings.baseApiUrl + 'blog-items', {
        method: 'GET',
        success: function (response) {
            var template = $("#blogItemsTemplate").html();
            var html = Mustache.render(template, {
                blogItems: response
            });
            $('#blog').append(html);
            $('#blog a').click(function(){
                $(this).parent().next().modal();
                return false;
            });
        }
    })    
});