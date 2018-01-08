(function (appSettings) {
    angular
        .module('app', ['ngRoute', 'ui.router'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('about', {
                url: '/',
                templateUrl: '/js/app/about/about.view.html',
                controller: 'aboutController'
            });

        $urlRouterProvider.otherwise('/');
    }

    run.$inject = ['$rootScope'];
    function run($rootScope) {
        $rootScope.appSettings = appSettings;
    }
})({
    baseApiUrl: 'https://my-json-server.typicode.com/BelHardAcademy/HtmlJS/'
});