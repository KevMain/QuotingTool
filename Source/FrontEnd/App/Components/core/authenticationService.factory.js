(function (angular) {

    angular
        .module('app.core')
        .factory('authenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http'];

    function AuthenticationService($http) {
        var authService = {};
 
        authService.login = function (credentials) {
            return $http.post('http://localhost:9876/Authentication');
        };
        

        return authService;
    }

}(angular));
