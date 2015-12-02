var config = require('../config');

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var path = require('path');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var errorAlert = require('../libs/errorAlert');
var logAlert = require('../libs/logAlert');
var head = require('../libs/headBanner');
var minifyCss = require('gulp-minify-css');
var bytediff = require('gulp-bytediff');

var cssTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.css.dest)
  }

  logAlert('Compiling Sass files', 'info', settings.dest);

  return gulp.src(settings.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(head('/**', '*/'))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())
}

var cssTaskRelease = function() {

  var settings = {
    src: path.join(config.root.dest, config.tasks.css.dest, '/**/*.css'),
    dest: path.join(config.root.public, config.tasks.css.dest)
  }

  logAlert('CSS release', 'info', settings.dest, 'yellow');

  return gulp.src(settings.src)
    .pipe(bytediff())
    .pipe(minifyCss())
    .pipe(bytediff.stop())
    .pipe(head('/*!', '*/'))
    .pipe(gulp.dest(settings.dest))
}

gulp.task('css', cssTask);
gulp.task('css.release', cssTaskRelease);

module.exports = cssTask;
