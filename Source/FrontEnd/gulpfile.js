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

var noCache = Math.ceil(new Date().getTime() / 60000);

gulp.task('default', ['build'], function () {
    gutil.log('Starting up server');
    connect.server();
});

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
    .pipe(uglify())
    .pipe(rename({suffix: noCache}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.paths.scripts.pub));
});

gulp.task('styles', function() {
    del.sync([config.paths.styles.pub + '/*']);

    return gulp
        .src(config.paths.styles.dev + '/*.less')
        .pipe(less())
        .pipe(shorthand())
        .pipe(rename({suffix: noCache}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.paths.styles.pub));
});


gulp.task('build', ['mark-up'], function () {
    return true;
});

gulp.task('mark-up', ['scripts','styles'], function () {
    gutil.log('Building index.htm');

    return gulp
        .src([config.paths.dev + '/index.htm'])
        .pipe(htmlReplace({
            'css':'assets/css/main' + noCache + '.min.css',
            'js':'assets/js/app' + noCache + '.min.js'
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('.'));
});