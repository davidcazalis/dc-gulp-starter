'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var env = require('gulp-environments');
var dev = env.development;
var prod = env.production;
var browserSync = require('browser-sync');
var joinPath = require('path.join');

var gulpSequence = require('gulp-sequence');

var templatesTask = function (cb) {
  return gulpSequence('templates.pug', 'templates.mustache', cb);
}

gulp.task('templates', templatesTask)
module.exports = templatesTask
