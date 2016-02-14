angular.module('accounts')
    .controller('CreateAccountController', ['$timeout', 'accountsService', function($timeout, accountsService) {
        var scope = this;

        function onSuccess() {
            scope.status = 'success';
        }

        function onFailure() {
            scope.status = 'failure';
        }

        function resetStatus() {
            $timeout(function() {
                scope.status = '';
            }, 3000);
        }

        scope.createAccount = function() {
            accountsService.createAccount().then(onSuccess, onFailure).finally(resetStatus);
        };
    }]);