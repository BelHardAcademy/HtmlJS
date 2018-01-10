(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('blogController', blogController);

    function blogController() {
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
    }

})();