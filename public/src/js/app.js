var trinkiter = angular.module('trinkiter',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        var tmplPath = './src/templates/';

        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('welcome', {
                url: '/',
                templateUrl: tmplPath+'welcomeTmpl.html',
                controller: 'welcomeCtrl'
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
                abstract: true,
                templateUrl: tmplPath+'dashboardTmpl.html',
                controller: 'dashCtrl'
            })
            .state('dashboard.trinkits', {
                url: '/trinkits',
                templateUrl: tmplPath+'dashboard-trinkits-tmpl.html',
                controller: 'trinkitCtrl'
            })
            .state('dashboard.trinkits.new', {
                url: '/new',
                templateUrl: tmplPath+'dashboard-trinkits-new-tmpl.html',
                controller: 'trinkitCtrl'
            })
            .state('dashboard.account', {
                url: '/account',
                templateUrl: tmplPath+'dashboard-account-tmpl.html',
                controller: 'accountCtrl'
            });
    });