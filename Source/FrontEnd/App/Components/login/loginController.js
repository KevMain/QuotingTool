(function (angular) {
    'use strict';

    angular
        .module('app.login')
        .controller('loginController', LoginController);
        
    LoginController.$inject = [
        '$scope',
        '$location',
        'authenticationService',
    ];

    function LoginController ($scope, $location, authenticationService) {
        $scope.credentials = {
            username: '',
            password: ''
        };
    
        $scope.login = function (credentials) {
            authenticationService.login(credentials).then(function (user) {
                 $location.path('/dashboard/').replace();
            }, function () {
                alert('failed');
            });
        };
    }
    

}(angular));
