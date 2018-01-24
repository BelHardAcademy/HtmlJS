(function (appSettings) {

    angular
        .module('app', ['ngRoute', 'ui.router', 'ngValidate', 'ngStorage', 'base64'])
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
            .state('blog.item', {
                url: "^/blog/{id:int}",
                onEnter: ['$state', '$stateParams', '$http', '$compile', '$rootScope', 'blogService', function ($state, $stateParams, $http, $compile, $rootScope, blogService) {
                    blogService.get($stateParams.id, function (blog) {
                        $http.get('/js/app/blog/blog-item.view.html')
                            .then(function (response) {
                                var scope = $rootScope.$new(true);
                                scope.model = blog;
                                $('<div/>').modal({
                                    onRenderContent: function(){
                                        return $compile(response.data)(scope);
                                    },
                                    onClose: function () {
                                        $state.go('^');
                                    }
                                });
                            });
                    });
                }]
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
                    if (httpConfig.url.startsWith(appSettings.baseApiUrl) && $localStorageProvider.get('token')) {
                        httpConfig.headers['Authorization'] = $localStorageProvider.get('token');
                    }

                    return httpConfig;
                }
            };
        }]);

    }

    run.$inject = ['$rootScope', '$transitions'];

    function run($rootScope, $transitions) {
        $rootScope.appSettings = appSettings;

        $transitions.onSuccess({}, function(transition){
            console.log(transition.from());
        })
    }
})({
    baseApiUrl: 'https://my-json-server.typicode.com/BelHardAcademy/HtmlJS/'
});