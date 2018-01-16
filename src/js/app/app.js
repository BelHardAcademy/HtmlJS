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
            })
            .state('blog', {
                url: '/blog',
                templateUrl: '/js/app/blog/blog.view.html',
                controller: 'blogController'
            })
            .state('gallery', {
                url: '/gallery',
                templateUrl: '/js/app/gallery/gallery.view.html',
                controller: 'galleryController'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: '/js/app/contact/contact.view.html',
                controller: 'contactController'
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