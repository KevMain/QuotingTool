(function (angular) {

    angular
        .module('app.core')
        .factory('authenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http'];

    function AuthenticationService($http) {
        var authService = {};
 
        authService.login = function (credentials) {
            return $http.post('http://localhost:55962/api/authentication', credentials);
        };
        

        return authService;
    }

}(angular));
