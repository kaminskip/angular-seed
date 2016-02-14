angular.module('accounts')
    .controller('ShowAccountsController', ['accountsService', function(accountsService) {
        var scope = this;

        function updateModel(response) {
            var accounts = response.data.accounts;

            if (accounts.length !== 0) {
                scope.accounts = accounts;
                scope.end = false;
            } else {
                scope.pageNumber--;
                scope.end = true;
            }
        }

        function getAccounts() {
            accountsService.getAccounts(scope.pageNumber, scope.pageSize).then(updateModel);
        }

        scope.pageNumber = 0;
        scope.pageSize = 3;

        scope.prev = function() {
            scope.pageNumber--;
            getAccounts();
        }

        scope.next = function() {
            scope.pageNumber++;
            getAccounts();
        }

        getAccounts();
    }]);