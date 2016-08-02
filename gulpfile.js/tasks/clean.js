'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var del = require('del');

var cleanTask = function (cb) {
  return del([config.root.dest + '/**/*']);
}

var cleanBower = function(cb) {
  return del([config.root.bower + '/**/*'])
}

gulp.task('clean', cleanTask);
gulp.task('clean.bower', cleanBower);

module.exports = cleanTask;
module.exports = cleanBower;
