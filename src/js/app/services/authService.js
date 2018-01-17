(function () {
    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$localStorage'];

    function authService($localStorage) {
        return {
            login: function (model, successCalback) {
                $localStorage.login = model.login;
                $localStorage.token = 'token';
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