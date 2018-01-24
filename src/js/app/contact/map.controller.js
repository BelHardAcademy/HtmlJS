(function () {
    'use strict';

    angular
        .module('app')
        .controller('mapController', mapController);

    mapController.$inject = ['$scope', '$timeout'];

    function mapController($scope, $timeout) {
        $scope.map = {
            routes: [],
            onGetPosition: function (coords) {
                $scope.map.routes.push({
                    points: [
                        [coords.latitude, coords.longitude],
                        [53.918474, 27.583611],
                        ['Академия наук Минск']
                    ]
                });
                $scope.$apply();
            }
        }
    }
})();