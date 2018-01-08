(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('aboutController', aboutController);

    aboutController.$inject = ['$scope'];
    function aboutController($scope) {
        $scope.openModal = function(e){
            $(e.currentTarget).modal();
        }
    }
})();