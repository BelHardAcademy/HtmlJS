(function (appSettings) {

    angular
        .module('app', ['ngRoute', 'ui.router', 'ngValidate', 'ngStorage'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$validatorProvider', '$httpProvider', '$localStorageProvider'];

    function config($stateProvider, $urlRouterProvider, $validatorProvider, $httpProvider, $localStorageProvider) {
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

        $validatorProvider.setDefaults({
            errorElement: 'span'
        });
        $validatorProvider.setDefaultMessages({
            required: 'Это поле обязательно для заполнения.',
            email: 'Неверный формат email-адреса.'
        });
        $validatorProvider.addMethod('tel', function (value, element) {
            return /\+[\d\s\-]{9,}/.test(value);
        }, 'Неверный формат номера телефона.');

        $httpProvider.interceptors.push(['$q', function ($q) {
            return {
                'request': function (httpConfig) {
                    if ($localStorageProvider.get('token')) {
                        httpConfig.headers['Authorization'] = $localStorageProvider.get('token');
                    }

                    return httpConfig;
                }
            };
        }]);

    }

    run.$inject = ['$rootScope'];

    function run($rootScope) {
        $rootScope.appSettings = appSettings;
    }
})({
    baseApiUrl: 'https://my-json-server.typicode.com/BelHardAcademy/HtmlJS/'
});