//Application constants
var BUILD_DIR = "./build/",
    SRC_DIR = "./src/",
    BOWER_DIR = "./bower_components/",
    VENDOR_LIBS = [
        BOWER_DIR + 'jquery/dist/jquery.js',
        BOWER_DIR + 'bootstrap/dist/js/bootstrap.js',
        BOWER_DIR + 'angular/angular.js',
        BOWER_DIR + 'angular-route/angular-route.js',
        BOWER_DIR + 'angular-cookies/angular-cookies.js',
        BOWER_DIR + 'angular-translate/angular-translate.js',
        BOWER_DIR + 'angular-translate-storage-local/angular-translate-storage-local.js',
        BOWER_DIR + 'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        BOWER_DIR + 'angular-translate-storage-cookie/angular-translate-storage-cookie.js',
        BOWER_DIR + 'angular-bootstrap/ui-bootstrap.js'
    ],
    VENDOR_FILE = "vendor_libs.js",
    APP_LIBS = [
        SRC_DIR + 'app/app.js',
        SRC_DIR + 'app/routing.js',
        SRC_DIR + 'app/**/*Module.js',
        SRC_DIR + 'app/**/*Service.js',
        SRC_DIR + 'app/**/*Directive.js',
        SRC_DIR + 'app/**/*Controller.js'
    ],
    APP_FILE = "app_libs.js",
    CSS = [
        BOWER_DIR + 'bootstrap/dist/css/bootstrap.css',
        SRC_DIR + 'assets/css/style.css'
    ],
    CSS_FILE = "style.css";

// Gulp modules
var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    copy = require('gulp-copy'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    Server = require('karma').Server,
    exec = require('child_process').exec;

// Gulp tasks

// Clean build dir
gulp.task('clean', function () {
    return del(BUILD_DIR);
});

// Concat, minify and copy all CSS files to build dir
gulp.task('build_css', function () {
    return gulp.src(CSS)
        .pipe(concat(CSS_FILE))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(BUILD_DIR + 'assets/css/'));
});

// Concat, uglify and copy all JS vendor files to build dir
gulp.task('build_vendor_js', function () {
    return gulp.src(VENDOR_LIBS)
        .pipe(concat(VENDOR_FILE))
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_DIR + '/app'));
});

// Concat, uglify and copy all JS app files to build dir
gulp.task('build_app_js', function () {
    return gulp.src(APP_LIBS)
        .pipe(concat(APP_FILE))
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_DIR + '/app'));
});

// Copy all html, images and fonts files to build dir
gulp.task('build_resources', function () {
    gulp.src(SRC_DIR + 'app/**/*.html')
        .pipe(gulp.dest(BUILD_DIR + '/app'));
    return gulp.src(SRC_DIR + 'assets/lang/**')
        .pipe(gulp.dest(BUILD_DIR + '/assets/lang'));
});

// Build all application in production
gulp.task('build', ['build_css', 'build_resources', 'build_vendor_js', 'build_app_js'], function () {
    var files = [
        BUILD_DIR + '**/*.css',
        BUILD_DIR + '**/vendor_libs.js',
        BUILD_DIR + '**/app_libs.js'
    ];
    var src = gulp.src(files, {read: false});
    return gulp.src(SRC_DIR + 'index.html')
        .pipe(inject(src, {ignorePath: 'build', addRootSlash: false}))
        .pipe(gulp.dest(BUILD_DIR));
});

// Run test in production
gulp.task('run_unit_test', function (done) {
    new Server({
        configFile: __dirname + '/src/test/unit/karma.conf.js',
        singleRun: true
    }, done).start();
});


// Build all application in developer mode
gulp.task('dev_copy', function () {
    gulp.src([SRC_DIR + 'assets/css/style.css']).pipe(gulp.dest(BUILD_DIR + 'assets/css/'));
    gulp.src(APP_LIBS).pipe(gulp.dest(BUILD_DIR + '/app'));
    gulp.src(SRC_DIR + 'assets/lang/**').pipe(gulp.dest(BUILD_DIR + '/assets/lang'));
    return gulp.src(SRC_DIR + 'app/**/*.html').pipe(gulp.dest(BUILD_DIR + '/app'));
});

// Build all application in developer mode
gulp.task('dev_createIndex', ['dev_copy'], function () {
    var src = gulp.src(CSS.concat(VENDOR_LIBS).concat(APP_LIBS), {read: false});
    return gulp.src(SRC_DIR + 'index.html')
        .pipe(inject(src, {relative: true}))
        .pipe(gulp.dest(BUILD_DIR));
});

// Watch for changes in src dir
gulp.task('dev_watch', function () {
    watch(SRC_DIR + '**/*.*', batch(function (events, done) {
        gulp.start('dev_createIndex', done);
    }));
});

// The default task
gulp.task('default', ['dev_createIndex', 'dev_watch']);