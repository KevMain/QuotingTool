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

gulp.task('scripts', function() {
    del.sync(['Assets/js/app.js']);

    return gulp.src(['App/app.module.js', 'App/**/**.module.js', 'App/**/**.config.js', 'App/**/**.factory.js', 'App/**/**.js'])
    .pipe(jshint())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('Assets/js'));
});

gulp.task('styles', function() {
    del.sync(['Assets/css/main.css']);

    return gulp
        .src('App/Styles/*.less')
        .pipe(less())
        .pipe(shorthand())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('Assets/css'));
});

gulp.task('default', ['scripts', 'styles'], function () {
    gutil.log('Starting up server');
    connect.server();
});
