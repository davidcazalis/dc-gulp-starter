var config = require('../config');

var gulp = require('gulp');
var path = require('path');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var errorAlert = require('../libs/errorAlert');
var logAlert = require('../libs/logAlert');
var sizeDiff = require('../libs/sizeDiff');
var bytediff = require('gulp-bytediff');
var fontmin = require('gulp-fontmin');

var fontsTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.fonts.src, '**'),
    dest: path.join(config.root.dest, config.tasks.fonts.dest)
  }

  logAlert('Moving fonts to build folder', 'info', settings.dest);

  return gulp.src(settings.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(changed(settings.dest))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())
}

var fontTaskRelease = function() {

  var settings = {
    src: path.join(config.root.dest, config.tasks.fonts.dest, '/**/*'),
    dest: path.join(config.root.public, config.tasks.fonts.dest)
  }

  logAlert('Fonts release', 'info', settings.dest, 'yellow');

  return gulp.src(settings.src)
    .pipe(bytediff.start())
    .pipe(fontmin())
    .pipe(bytediff.stop())
    .pipe(gulp.dest(settings.dest))
}

gulp.task('fonts', fontsTask);
gulp.task('fonts.release', fontTaskRelease);

module.exports = fontsTask;
