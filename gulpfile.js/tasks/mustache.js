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
var prettify = require('gulp-prettify');

var mustache = require('gulp-mustache');
var rename = require('gulp-rename');
var data = require('gulp-data');
var _ = require('lodash');

var templatesMustache = config.tasks.templates.mustache;
var paths = {
  src : joinPath(config.root.dest, templatesMustache.src, "**/*.mustache"),
  data: joinPath('src/', config.tasks.templates.src, 'data.json'),
  dest: joinPath(config.root.dest, templatesMustache.dest)
}

var mustacheTask = function () {
  return gulp.src(paths.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(mustache(paths.data))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('templates.mustache', mustacheTask)

module.exports = mustacheTask;
