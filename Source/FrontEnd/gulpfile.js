var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
    del.sync(['Assets/js/app.js']);

    return gulp.src(['App/app.module.js', 'App/**/**.config.js', 'App/**/**.module.js', 'App/**/**.factory.js', 'App/**/**.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('Assets'));
});

gulp.task('default', ['scripts'], function () {
    connect.server();
});
