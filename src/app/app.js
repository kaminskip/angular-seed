angular.module('app', ['ngRoute', 'ngCookies', 'pascalprecht.translate', 'security', 'accounts'])
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.useLocalStorage(true);
        $translateProvider.preferredLanguage('pl');
        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/lang/',
            suffix: '.json'
        });
    }])
    .controller('AppController', ['$translate', '$location', '$scope', function($translate, $location, $scope) {
        var scope = this;

        scope.setLanguage = function(language) {
            $translate.use(language);
        };

        if (!scope.isAuthorized) {
            $location.path('login');
        }

        $scope.$on('is-authorized', function() {
            scope.isAuthorized = true;
            $location.path('/');
        });
    }])
    .filter('reverse', function() {
        return function (string) {
            return string.split('').reverse().join();
        };
    });