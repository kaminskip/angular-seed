angular.module('app')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            controller: 'LoginController',
            controllerAs: 'loginController',
            templateUrl: 'app/security/loginForm.html'
        });
        $routeProvider.when('/createAccount', {
            controller: 'CreateAccountController',
            controllerAs: 'createAccountController',
            templateUrl: 'app/accounts/createAccount.html'
        });
        $routeProvider.when('/showAccounts', {
            controller: 'ShowAccountsController',
            controllerAs: 'showAccountsController',
            templateUrl: 'app/accounts/showAccounts.html'
        });
    }]);