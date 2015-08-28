'use strict';

// Add external config file
var config = require('./config.json');

var browserSync = require('browser-sync').create(),
    del = require('del');

// Gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    jade = require("gulp-jade"),
    gulpif = require("gulp-if");

// ==========================================================================
// Tasks
// ==========================================================================

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
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browser: [config.browserslist],
        cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest (config.styles.dest))
    .pipe(browserSync.stream());
});

// Compile Jade files into HTML
gulp.task('templates', function() {
  clean(config.templates.dest, 'html');
  return gulp.src(config.templates.src)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest (config.templates.dest))
    .pipe(browserSync.stream());
});

// Create a server and watch files
gulp.task('live', ['styles', 'templates'], function() {
  browserSync.init({
    startPath: config.templates.dest+'/index.html',
    server: {
      baseDir: './',
      directory: true
    }
  });

  gulp.watch(config.styles.src, ['styles']);
  gulp.watch(config.templates.src, ['templates']);
  gulp.watch(config.templates.dest+'/*.html').on('change', browserSync.reload);
});
