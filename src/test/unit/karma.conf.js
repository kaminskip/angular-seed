// Karma configuration
// Generated on Fri Feb 12 2016 15:07:27 GMT+0100 (CET)

module.exports = function (config) {

    var SRC_DIR = "./src/",
        BOWER_DIR = "./bower_components/";

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../../../',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            BOWER_DIR + 'jquery/dist/jquery.js',
            BOWER_DIR + 'bootstrap/dist/js/bootstrap.js',
            BOWER_DIR + 'angular/angular.js',
            BOWER_DIR + 'angular-route/angular-route.js',
            BOWER_DIR + 'angular-cookies/angular-cookies.js',
            BOWER_DIR + 'angular-translate/angular-translate.js',
            BOWER_DIR + 'angular-translate-storage-local/angular-translate-storage-local.js',
            BOWER_DIR + 'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            BOWER_DIR + 'angular-translate-storage-cookie/angular-translate-storage-cookie.js',
            BOWER_DIR + 'angular-bootstrap/ui-bootstrap.js',
            SRC_DIR + 'app/app.js',
            SRC_DIR + 'app/routing.js',
            SRC_DIR + 'app/**/*Module.js',
            SRC_DIR + 'app/**/*Service.js',
            SRC_DIR + 'app/**/*Directive.js',
            SRC_DIR + 'app/**/*Controller.js',
            SRC_DIR + 'test/unit/**/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
