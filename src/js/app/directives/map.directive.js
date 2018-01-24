(function () {
    'use strict';

    angular
        .module('app')
        .directive('map', map);

    var defaultSettings = {
        center: [53.918474, 27.583611],
        zoom: 12
    };

    function map() {
        return {
            restrict: 'E',
            scope: {
                settings: '=',
                onGetPosition: '&'
            },
            transclude: true,
            link: function ($scope, element, attrs, ctrl, transcludeFn) {
                transcludeFn(function (copy) {
                    element.append(copy);
                });
            },
            controller: ['$scope', '$element', function ($scope, $element) {
                var self = this;
                ymaps.load().then(function (ymaps) {
                    ymaps.ready(function () {
                        var map = new ymaps.Map($element[0], angular.extend({}, defaultSettings, $scope.settings));
                        $scope.$broadcast('ready');
                        if ($scope.onGetPosition && navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                $scope.onGetPosition({
                                    coords: position.coords
                                });
                            }, function (error) {
                                console.log(error.message);
                            });
                        }

                        self.addRoute = function (points) {
                            var multiRoute = new ymaps.multiRouter.MultiRoute({
                                referencePoints: points,
                                params: {
                                    routingMode: 'pedestrian'
                                }
                            }, {
                                boundsAutoApply: true
                            });
                            map.geoObjects.add(multiRoute);
                            return multiRoute;
                        }

                        self.removeRoute = function (route) {
                            map.geoObjects.remove(route);
                        }

                        self.addMarker = function (coordinates) {
                            var placeMark = new ymaps.Placemark(coordinates);
                            $scope.markers.add(placeMark);

                            return placeMark;
                        };

                        self.removeMarker = function (marker) {
                            $scope.geoObjects.remove(marker);
                        };
                    });
                });
            }]
        }
    }
})();