var config = require('../config');
var package = require('../../package');

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var path = require('path');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var data = require('gulp-data');
var errorAlert = require('../libs/errorAlert');
var logAlert = require('../libs/logAlert');
var head = require('../libs/headBanner');
var prettify = require('gulp-prettify');
var bytediff = require('gulp-bytediff');
var minifyHTML = require('gulp-minify-html');
var _ = require('lodash');


var htmlTask = function() {

  var settings = {
    src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{' + config.tasks.html.extensions + '}'), '!'+path.join(config.root.src, config.tasks.html.src, '/**/_*.{' + config.tasks.html.extensions + '}')],
    dest: path.join(config.root.dest, config.tasks.html.dest)
  }

  logAlert('Compiling Jade files', 'info', settings.dest);

  return gulp.src(settings.src)
    .pipe(data(function(file) {
      var data = _.assign({}, config, package);
      return data;
    }))
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(jade(config.tasks.html.jade))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())
}

var htmlTaskRelease = function() {

  var settings = {
    src: path.join(config.root.dest, config.tasks.html.dest, '/**/*.html'),
    dest: path.join(config.root.public, config.tasks.html.dest)
  }

  logAlert('HTML release', 'info', settings.dest, 'yellow');

  return gulp.src(settings.src)
    .pipe(bytediff())
    .pipe(minifyHTML({conditionals: true, spare:true}))
    .pipe(prettify({indent_size: 2}))
    .pipe(bytediff.stop())
    .pipe(gulp.dest(settings.dest))

}

gulp.task('html', htmlTask);
gulp.task('html.release', htmlTaskRelease);

module.exports = htmlTask;
