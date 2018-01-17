(function () {
    'use strict';
    angular
        .module('app')
        .controller('contactController', contactController);

    contactController.$inject = ['$scope', 'contactService'];

    function contactController($scope, contactService) {
        $scope.validationOptions = {
            rules: {
                phone: {
                    tel: true,
                    required: true
                },
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            }
        };

        $scope.authorized = true;

        $scope.send = function (form) {
            if (!form.validate()) {
                return false;
            }

            contactService.send({
                    name: $scope.model.name,
                    phone: $scope.model.phone,
                    email: $scope.model.email,
                    message: $scope.model.message
                },
                function () {
                    $scope.messageSent = true;
                }
            );
        }

        $scope.reset = function () {
            $scope.model = {};
            $scope.messageSent = false;
        }
    }

})();