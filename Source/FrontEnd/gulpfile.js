var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('scripts', function() {
    del.sync(['Assets/js/app.js']);

    return gulp.src(['App/app.module.js', 'App/**/**.config.js', 'App/**/**.module.js', 'App/**/**.factory.js', 'App/**/**.js'])
    .pipe(jshint())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('Assets'));
});

gulp.task('default', ['scripts'], function () {
    connect.server();
});
