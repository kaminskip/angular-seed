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
        SRC_DIR + 'app/**/*Controller.js',
        SRC_DIR + 'app/**/*Service.js',
        SRC_DIR + 'app/**/*Directive.js'
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


// Build all application in developer mode
gulp.task('dev_copy', function () {
    gulp.src(CSS).pipe(gulp.dest(BUILD_DIR + 'assets/css/'));
    gulp.src(VENDOR_LIBS).pipe(gulp.dest(BUILD_DIR + '/app/lib'));
    gulp.src(APP_LIBS).pipe(gulp.dest(BUILD_DIR + '/app'));
    gulp.src(SRC_DIR + 'app/**/*.html').pipe(gulp.dest(BUILD_DIR + '/app'));
    return gulp.src(SRC_DIR + 'assets/lang/**').pipe(gulp.dest(BUILD_DIR + '/assets/lang'));
});

// Build all application in developer mode
gulp.task('dev',['dev_copy'], function () {
    var files = CSS.concat(VENDOR_LIBS).concat(APP_LIBS);
    var src = gulp.src(files, {read: false});
    return gulp.src(SRC_DIR + 'index.html')
        .pipe(inject(src, {ignorePath: 'build', addRootSlash: false}))
        .pipe(gulp.dest(BUILD_DIR));
});
