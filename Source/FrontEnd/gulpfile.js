var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util')
var less = require('gulp-less');
var shorthand = require('gulp-shorthand');
var rename = require("gulp-rename");
var config = require('./gulp.config')();
var htmlReplace = require('gulp-html-replace');
var htmlmin = require('gulp-htmlmin');
var sync = require('browser-sync').create();

var noCache = Math.ceil(new Date().getTime() / 60000);

if(gutil.env.dev === true) {
    config.debug = true;
}

gulp.task('default', ['build','sync'], watch);

gulp.task('scripts', function() {
    del.sync([config.paths.scripts.pub + '/*']);

    return gulp.src([
        config.paths.dev + '/app.module.js', 
        config.paths.scripts.dev + '/**/**.module.js',
        config.paths.scripts.dev + '/**/**.config.js',
        config.paths.scripts.dev + '/**/**.factory.js',
        config.paths.scripts.dev + '/**/**.js'])
    .pipe(jshint())
    .pipe(concat('app.js'))
    .pipe(config.debug ? gutil.noop() : uglify())
    .pipe(rename({suffix: noCache}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.paths.scripts.pub));
});

gulp.task('styles', function() {
    del.sync([config.paths.styles.pub + '/*']);

    return gulp
        .src(config.paths.styles.dev + '/*.less')
        .pipe(less())
        .pipe(config.debug ? gutil.noop() : shorthand())
        .pipe(rename({suffix: noCache}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.paths.styles.pub));
});

gulp.task('build', ['mark-up'], function () {
    return true;
});

gulp.task('sync', function () {
    sync.init({
        server: ""
    });
});

gulp.task('mark-up', ['scripts','styles'], function () {
    gutil.log('Building index.htm');

    return gulp
        .src([config.paths.dev + '/index.htm'])
        .pipe(htmlReplace({
            'css':'assets/css/main' + noCache + '.min.css',
            'js':'assets/js/app' + noCache + '.min.js'
        }))
        .pipe(config.debug ? gutil.noop() : htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('.'));
});

gulp.task('watch-scripts', ['scripts'], sync.reload);

gulp.task('watch-styles', ['styles'], sync.reload);

function watch() {
    gulp.watch(config.paths.dev + '/**/**/*.htm', ['watch-scripts']);
    gulp.watch(config.paths.dev + '/**/**/*.less', ['watch-styles']);
    gulp.watch(config.paths.dev + '/**/**/*.js', ['watch-scripts']);
}