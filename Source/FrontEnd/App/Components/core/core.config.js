(function (angular) {
    'use strict';

    angular
        .module('app.core')
        .config(AppConfig);

    AppConfig.$inject = [
        '$routeProvider',
        '$locationProvider'
    ];

    function AppConfig($routeProvider, $locationProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'App/Components/login/loginView.htm',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/login'
            });
            
        $locationProvider.html5Mode(true).hashPrefix('!');
    }
    
}(angular));
