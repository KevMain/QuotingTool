!function(n){"use strict";n.module("app",["app.core","app.login"])}(angular),function(n){"use strict";function o(n,o){n.when("/login",{templateUrl:"App/Components/login/loginView.htm",controller:"loginController",controllerAs:"vm"}).otherwise({redirectTo:"/login"}),o.html5Mode(!0).hashPrefix("!")}n.module("app.core").config(o),o.$inject=["$routeProvider","$locationProvider"]}(angular),function(n){"use strict";n.module("app.login",[])}(angular),function(n){"use strict";n.module("app.core",["ngRoute"])}(angular),function(n){function o(n){var o={};return o.login=function(o){return n.post("http://localhost:55962/api/authentication",o)},o}n.module("app.core").factory("authenticationService",o),o.$inject=["$http"]}(angular),function(n){"use strict";function o(n,o,t){n.credentials={username:"",password:""},n.login=function(n){t.login(n).then(function(n){o.path("/dashboard/").replace()},function(){alert("failed")})}}n.module("app.login").controller("loginController",o),o.$inject=["$scope","$location","authenticationService"]}(angular);