var config = require('../config');

var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var errorAlert = require('../libs/errorAlert');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var logAlert = require('../libs/logAlert');
var head = require('../libs/headBanner');
var bytediff = require('gulp-bytediff');

var spritesTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.sprites.src, '**/*.svg'),
    dest: path.join(config.root.dest, config.tasks.sprites.dest)
  }

  logAlert('Creating SVG sprite', 'info', settings.dest);

  return gulp.src(settings.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(svgstore())
    .pipe(head('<!--', '-->'))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())
}

var spritesTaskRelease = function() {

  var settings = {
    src: path.join(config.root.dest, config.tasks.sprites.dest, '/**/*'),
    dest: path.join(config.root.public, config.tasks.sprites.dest)
  }

  logAlert('SVG sprites release', 'info', settings.dest, 'yellow');

  return gulp.src(settings.src)
    .pipe(imagemin({
      svgoPlugins: [{removeViewBox: false},{cleanupIDs: false}],
    }))
    .on('error', errorAlert)
    .pipe(head('<!--', '-->'))
    .pipe(gulp.dest(settings.dest))

}

gulp.task('sprites', spritesTask);
gulp.task('sprites.release', spritesTaskRelease);

module.exports = spritesTask;
