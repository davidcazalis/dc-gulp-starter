'use strict';

// Add external config file
var config = require('./config.json');

var browserSync = require('browser-sync').create(),
    del = require('del'),
    options = require("minimist")(process.argv.slice(2));

// Gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    jade = require('gulp-jade'),
    gulpif = require('gulp-if'),
    jshint = require('gulp-jshint'),
    run = require('gulp-run');

function clean(path, files) {
  gutil.log(gutil.colors.grey('Clean '+ files +' files.'));
  del([path + '/*.' + files]);
}

// ==========================================================================
// Tasks
// ==========================================================================

// Compile Sass files into CSS
gulp.task('styles', function() {
  clean(config.styles.dest, 'css');
  return gulp.src(config.styles.src)
    .pipe(!options.production ? plumber() : gutil.noop())
    .pipe(!options.production ? sourcemaps.init() : gutil.noop())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browser: [config.browserslist],
        cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(!options.production ? gulp.dest (config.styles.dest) : gulp.dest (config.styles.build))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

// Compile Jade files into HTML
gulp.task('templates', function() {
  clean(config.templates.dest, 'html');
  return gulp.src(config.templates.src)
    .pipe(!options.production ? plumber() : gutil.noop())
    .pipe(jade({
      pretty: true
    }))
    .pipe(!options.production ? gulp.dest (config.templates.dest) : gulp.dest (config.templates.build))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

// JavaScripts things
gulp.task('scripts', function() {
  return gulp.src(config.scripts.src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});

// Create a server and watch files
gulp.task('live', function() {
  browserSync.init({
    startPath: config.templates.dest+'/index.html',
    server: {
      baseDir: './',
      directory: true
    }
  });

  gulp.watch(config.styles.src, ['styles']);
  gulp.watch(config.templates.src, ['templates']);
  gulp.watch(config.scripts.src, ['scripts']);
  gulp.watch(config.templates.dest+'/*.html').on('change', browserSync.reload);
});

// Tests
gulp.task('test', ['styles', 'templates', 'scripts']);

// Development task
gulp.task('dev', ['styles', 'templates', 'scripts', 'live']);
