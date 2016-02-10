(function (angular) {
    'use strict';

    angular
        .module('app.login')
        .controller('loginController', LoginController);
        
    LoginController.$inject = [
        '$scope',
        'authenticationService'
    ];

    function LoginController ($scope, authenticationService) {
        $scope.credentials = {
            username: '',
            password: ''
        };
    
        $scope.login = function (credentials) {
            authenticationService.login(credentials).then(function (user) {
                alert('worked');
            }, function () {
                alert('failed');
            });
        };
    }
    

}(angular));
