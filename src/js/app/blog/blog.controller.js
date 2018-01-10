(function () {
    'use strict';

    angular
        .module('app')
        .controller('blogController', blogController);

    blogController.$inject = ['$scope', '$http', 'blogService']

    function blogController($scope, $http, blogService) {
        blogService.getBlogItems(function (items) {
            $scope.blogItems = items;
        });
    }

})();