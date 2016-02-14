angular.module('accounts')
    .service('accountsService', ['$http', function($http) {
        var service = this,
            accountsUrl = 'http://localhost:8080/api/accounts',
            operationsUrl = 'http://localhost:8080/api/operation';

        service.createAccount = function() {
            return $http({
                url: accountsUrl,
                method: 'POST'
            });
        };

        service.getAccounts = function(pageNumber, pageSize) {
            return $http({
                url: accountsUrl,
                params: {
                    pageNumber: pageNumber,
                    pageSize: pageSize
                }
            });
        };

        service.process = function(operation) {
            return $http({
                url: operationsUrl,
                method: 'POST',
                data: operation
            });
        };
    }]);