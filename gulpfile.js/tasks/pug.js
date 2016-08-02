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

var pug = require('gulp-pug');
var data = require('gulp-data');
var _ = require('lodash');
var changed = require('gulp-changed');
var rename = require('gulp-rename');

var templates = config.tasks.templates;
var paths = {
  src : joinPath(config.root.src, templates.src, "**/*.pug"),
  data: joinPath('../../src', config.tasks.templates.src, 'data.json'),
  dest: config.root.dest + "/" + templates.dest
}

var pugTask = function () {
  return gulp.src(paths.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(data(function(file) {
      var filter
      var data = _.assign(require(paths.data), config);
      return data;
    }))
    .pipe(changed(paths.dest))
    .pipe(pug(templates.pug))
    .pipe(rename({
      extname: '.mustache'
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('templates.pug', pugTask)

module.exports = pugTask
