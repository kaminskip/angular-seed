angular.module('security')
    .service('loginService', ['$http', '$httpParamSerializer', '$q', '$rootScope', function($http, $httpParamSerializer, $q, $rootScope) {
        var service = this,
            loginUrl = 'http://localhost:8080/oauth/token',
            data = { grant_type: 'password', client_id: 'client_app' };

        function onResponse(response) {
            var token = response.data['access_token'];

            return $q(function(resolve, reject) {
                if (typeof token !== 'undefined') {
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    $rootScope.$broadcast('is-authorized');
                    resolve();
                } else {
                    reject();
                }
            });
        }

        service.login = function(login, password) {
            delete $http.defaults.headers.common['Authorization'];
            data.username = login;
            data.password = password;
            return $http({
                url: loginUrl,
                method: 'POST',
                data: $httpParamSerializer(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(onResponse);
        };
    }]);