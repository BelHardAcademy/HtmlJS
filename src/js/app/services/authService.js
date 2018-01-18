(function () {
    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$localStorage', '$base64'];

    function authService($localStorage, $base64) {
        return {
            login: function (model, successCalback) {
                $localStorage.login = model.login;
                $localStorage.token = `Basic ${$base64.encode(model.login + model.password)}`;
                successCalback();
            },
            logout: function () {
                delete $localStorage.login;
                delete $localStorage.token;
            },
            isAuthorized: function () {
                return $localStorage.token !== undefined;
            }
        }
    }
})();