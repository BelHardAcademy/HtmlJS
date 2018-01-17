(function () {
    'use strict';

    angular
        .module('app')
        .controller('aboutController', aboutController);

    aboutController.$inject = ['$scope', '$sessionStorage'];

    function aboutController($scope, $sessionStorage) {
        $scope.model = {
            name: 'Сергей Вишневский',
            birthday: '24.01.1962',
            education: 'Высшее'
        }

        $scope.video = {
            time: $sessionStorage.videoTime || 0,
            sources: [{
                type: 'video/mp4',
                src: 'http://techslides.com/demos/sample-videos/small.mp4'
            }],
            onended: function () {
                $scope.video.ended = $sessionStorage.videoEnded = true;
                $scope.$apply();
            },
            ended: $sessionStorage.videoEnded,
            control: {},
            reset: function () {
                if ($scope.video.control.reset) {
                    $scope.video.control.reset()
                }

                $scope.video.ended = $sessionStorage.videoEnded = false;
            }
        };

        $scope.$watch('video.time', function (newValue) {
            $sessionStorage.videoTime = newValue;
        });
    }
})();