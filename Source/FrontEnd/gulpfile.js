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
var angularTemplatecache = require('gulp-angular-templatecache');
var modRewrite  = require('connect-modrewrite');

var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;
    
var noCache = Math.ceil(new Date().getTime() / 60000);

if(gutil.env.dev === true) {
    config.debug = true;
}

gulp.task('default', ['build','sync'], watch);

gulp.task('scripts', ['templates'], function() {
    del.sync([config.paths.scripts.pub + '/*']);

    return gulp.src([
        config.paths.dev + '/app.module.js', 
        config.paths.scripts.dev + '/**/**.module.js',
        config.paths.scripts.dev + '/**/**.config.js',
        config.paths.scripts.dev + '/**/**.factory.js',
        config.paths.scripts.dev + '/**/**.js',
        config.paths.temp + '/' + config.templateCache.file])
    .pipe(jshint())
    .pipe(concat('app.js'))
    .pipe(config.debug ? gutil.noop() : uglify())
    .pipe(rename({suffix: noCache}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.paths.scripts.pub))
    .pipe(refresh(lrserver));
});

gulp.task('bootstrap', function() {
    del.sync([config.paths.styles.pub + '/*']);

    return gulp
        .src(config.paths.styles.dev + '/*.css')
        .pipe(concat('bootstrap.css'))
        .pipe(config.debug ? gutil.noop() : shorthand())
        .pipe(rename({suffix: noCache}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.paths.styles.pub))
        .pipe(refresh(lrserver));
});

gulp.task('styles', function() {
    return gulp
        .src(config.paths.styles.dev + '/*.less')
        .pipe(less())
        .pipe(config.debug ? gutil.noop() : shorthand())
        .pipe(rename({suffix: noCache}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.paths.styles.pub))
        .pipe(refresh(lrserver));
});

gulp.task('templates', function () {
    del.sync([config.paths.temp + '/*']);

    return gulp
        .src(config.templateCache.source)
        .pipe(config.debug ? gutil.noop() : htmlmin({
            collapseWhitespace: true,
            empty: true
        }))
        .pipe(angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.templateCache.compiled));
});

gulp.task('build', ['mark-up'], function () {
    del([config.paths.temp]);
    return true;
});

gulp.task('sync', function () {
    var server = express();
    server.use(livereload({port: livereloadport}));
    server.use(express.static('.'));
    server.all('/*', function(req, res) {
        res.sendfile('index.htm', { root: '' });
    });
    
    server.listen(serverport);
    lrserver.listen(livereloadport);
});

gulp.task('mark-up', ['scripts', 'bootstrap','styles'], function () {
    gutil.log('Building index.htm');

    return gulp
        .src([config.paths.dev + '/index.htm'])
        .pipe(htmlReplace({
            'bootstrap':'assets/css/bootstrap' + noCache + '.min.css', 
            'css':'assets/css/main' + noCache + '.min.css',
            'js':'assets/js/app' + noCache + '.min.js'
        }))
        .pipe(config.debug ? gutil.noop() : htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('.'));
});

gulp.task('watch-scripts', ['scripts']);

gulp.task('watch-styles', ['styles']);

function watch() {
    gulp.watch(config.paths.dev + '/**/**/*.htm', ['templates','watch-scripts']);
    gulp.watch(config.paths.dev + '/**/**/*.less', ['watch-styles']);
    gulp.watch(config.paths.dev + '/**/**/*.js', ['watch-scripts']);
}