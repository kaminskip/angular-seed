angular.module('security')
    .controller('LoginController', ['loginService', function(loginService) {
        var scope = this;

        function onFailure() {
            scope.status = 'failure';
        }

        scope.tryLogin = function() {
            scope.status = '';
            loginService.login(scope.login, scope.password).catch(onFailure);
        };
    }]);