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

gulp.task('styles', function() {
    gutil.log('Deleting styles');
    del.sync(['Assets/css/main.css']);

    gutil.log('Building styles');
    return gulp
        .src('App/Styles/*.less')
        //.pipe(plugins.plumber())
        //.pipe(plugins.less())
        //.pipe(plugins.autoprefixer(config.autoprefixer))
        //.pipe(config.debug ? util.noop() : plugins.shorthand())
        //.//pipe(plugins.rename({
         //   suffix: noCache
        //}))
        //.pipe(gulp.dest(config.paths.styles.pub))
        //.pipe(plugins.rename({
        //    suffix: '.min'
        //}))
        //.pipe(plugins.sourcemaps.init())
        //.pipe(plugins.bytediff.start())
        //.pipe(config.debug ? util.noop() : plugins.csso())
        //.pipe(plugins.bytediff.stop(bytediffFormatter))
        //.pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('Assets/css'))
        //.pipe(sync.reload({stream:true}));
});

gulp.task('default', ['scripts'], function () {
    gutil.log('Starting up server');
    connect.server();
});
