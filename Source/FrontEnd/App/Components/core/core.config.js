(function (angular) {
    'use strict';

    angular
        .module('app.core')
        .config(AppConfig);

    AppConfig.$inject = [
        '$routeProvider'
    ];

    function AppConfig($routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'loginView.htm',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }

}(angular));
