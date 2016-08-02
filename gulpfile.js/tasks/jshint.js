'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var env = require('gulp-environments');
var dev = env.development;
var prod = env.production;
var browserSync = require('browser-sync');
var joinPath = require('path.join');
var errorAlert = require('../libs/errorAlert');
var logAlert = require('../libs/logAlert');
var plumber = require('gulp-plumber');

var jshint  = require('gulp-jshint');

var js = config.tasks.js;
var paths = {
  src : joinPath(config.root.src, js.src, "/**/*.js"),
  dest: joinPath(config.root.dest, js.dest),
  config: joinPath(config.root.gulp, '.jshintrc')
}

var jshintTask = function () {
  return gulp.src(paths.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(jshint(paths.config))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(browserSync.stream())
}

gulp.task('jshint', jshintTask);

module.exports = jshintTask
