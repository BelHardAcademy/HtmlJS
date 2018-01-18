(function () {
    'use strict'

    angular
        .module('app')
        .controller('menuController', menuController);

    menuController.$inject = ['$scope', 'authService'];

    function menuController($scope, authService) {
        $scope.authorized = authService.isAuthorized();
        $scope.validationOptions = {
            rules: {
                login: {
                    required: true,
                    email: true
                },
                password: {
                    required: true
                }
            }
        };

        $scope.login = function (form) {
            if (!form.validate()) {
                return false;
            }
            
            authService.login({
                    login: $scope.model.login,
                    password: $scope.model.password
                },
                function () {
                    $scope.authorized = true;
                }
            );
        }

        $scope.logout = function(){
            authService.logout();
            $scope.authorized = false;
        }
    }
})();