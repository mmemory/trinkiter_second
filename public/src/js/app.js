var trinkiter = angular.module('trinkiter',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        var tmplPath = './src/templates/';

        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });

        $urlRouterProvider.otherwise("/welcome");

        $stateProvider
            .state('welcome', {
                url: '/',
                templateUrl: tmplPath+'welcomeTmpl.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: tmplPath+'loginTmpl.html',
                controller: 'loginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: tmplPath+'registerTmpl.html',
                controller: 'loginCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: tmplPath+'dashboardTmpl.html',
                controller: 'dashCtrl'
            })
            .state('dashboard.trinkits', {
                url: '/trinkits',
                templateUrl: tmplPath+'dashboard-trinkits-tmpl.html',
                controller: 'trinkitCtrl'
            })
            .state('dashboard.account', {
                url: '/account',
                templateUrl: tmplPath+'dashboard-account-tmpl.html',
                controller: 'accountCtrl'
            });
    });