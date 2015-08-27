'use strict';

// Gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),

    // Add external config file
    config = require('./config.json');


// Tasks
// ==========================================================================

gulp.task('styles', function() {
  return gulp.src(config.dev + config.styles.src)
    .pipe(watch(config.dev + config.styles.src))
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browser: [config.browserslist],
        cascade: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest (config.dev + config.styles.dest))
});
