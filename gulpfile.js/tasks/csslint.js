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

var postcss = require('gulp-postcss');
var listSelector = require('list-selectors').plugin;
var customProperties = require('postcss-custom-properties');

var postcssConfig = config.tasks.postcss;
var paths = {
  src : joinPath(config.root.dest, postcssConfig.dest, "/**/*." + "{" + postcssConfig.extensions + "}"),
  dest: joinPath(config.root.dest, postcssConfig.dest),
  fonts : joinPath(config.root.dest, config.tasks.fonts.dest)
}

var csslintTask = function () {

  function logSelector(data) {
    logAlert('Classes : ' + data.simpleSelectors.classes, 'info');
    logAlert('Types : ' + data.simpleSelectors.types, 'info');
    logAlert('Attributes : ' + data.simpleSelectors.attributes, 'info');
    logAlert('IDs : ' + data.simpleSelectors.ids, 'info');
  }

  var plugins = [
    listSelector(logSelector)
  ];

  return gulp.src(paths.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('csslint', csslintTask);
module.exports = csslintTask;
