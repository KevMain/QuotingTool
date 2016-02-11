(function (angular) {
    'use strict';

    angular
        .module('app', [
            'app.core',
            'app.login'
        ]);

}(angular));

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

(function (angular) {
    'use strict';

    angular
        .module('app.core', ['ngRoute']);

}(angular));

(function (angular) {
    'use strict';

    angular
        .module('app.login', []);

}(angular));

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

