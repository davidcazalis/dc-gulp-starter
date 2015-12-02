var config = require('../config');

var gulp = require('gulp');
var path = require('path');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var errorAlert = require('../libs/errorAlert');
var imagemin = require('gulp-imagemin');
var logAlert = require('../libs/logAlert');


var imagesTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.images.src, '**'),
    dest: path.join(config.root.dest, config.tasks.images.dest)
  }

  logAlert('Moving images assets', 'info', settings.dest);

  return gulp.src(settings.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(changed(settings.dest))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())

}

var imagesTaskRelease = function () {

  var settings = {
    src: path.join(config.root.dest, config.tasks.images.dest, '/**/*'),
    dest: path.join(config.root.public, config.tasks.images.dest)
  }

  logAlert('Images assets release', 'info', settings.dest, 'yellow');

  return gulp.src(settings.src)
    .pipe(imagemin())
    .on('error', errorAlert)
    .pipe(gulp.dest(settings.dest))

}

gulp.task('images', imagesTask);
gulp.task('images.release', imagesTaskRelease);

module.exports = imagesTask;
