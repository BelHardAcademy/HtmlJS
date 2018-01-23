(function () {
    'use strict';

    angular
        .module('app')
        .directive('map', map);

    var mapNumber = 0;
    var defaultSettings = {
        center: [53.918474, 27.583611],
        zoom: 12
    };

    function map() {
        return {
            restrict: 'E',
            template: '<div id="{{mapId}}" class="map" style="width:100%; height: 500px"></div>',
            scope: {
                settings: '=',
                onGetPosition: '&'
            },
            link: function (scope, element, attrs) {
                scope.mapId = `map-${mapNumber++}`;
                ymaps.load().then(function (ymaps) {
                    ymaps.ready(function () {
                        var map = new ymaps.Map(scope.mapId, angular.extend({}, defaultSettings, scope.settings));

                        if (scope.onGetPosition && navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                scope.onGetPosition(position.coords);
                            }, function (error) {
                                console.log(error.message);
                            });
                        }
                    });
                });
            }
        }
    }
})();