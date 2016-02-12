var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util')

gulp.task('scripts', function() {
    gutil.log('Deleting scripts');
    
    del.sync(['Assets/js/app.js']);

    gutil.log('Building scripts');
    
    return gulp.src(['App/app.module.js', 'App/**/**.module.js', 'App/**/**.config.js', 'App/**/**.factory.js', 'App/**/**.js'])
    .pipe(jshint())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('Assets/js'));
});

gulp.task('default', ['scripts'], function () {
    gutil.log('Starting up server');
    connect.server();
});
