(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('aboutController', aboutController);

    aboutController.$inject = ['$scope', '$timeout'];
    function aboutController($scope, $timeout) {
        $scope.model = {
            name: 'Сергей Вишневский',
            birthday: '24.01.1962',
            education: 'Высшее'
        }
    }
})();