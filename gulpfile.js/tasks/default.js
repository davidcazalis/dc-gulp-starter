'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var env = require('gulp-environments');
var dev = env.development;
var prod = env.production;
var browserSync = require('browser-sync');
var joinPath = require('path.join');

var gulpSequence = require('gulp-sequence');

var defaultTask = function (cb) {
  var clean = ['clean'];
  var bower = dev() ? 'bowerbuild' : 'bowerbundle';
  var assets = ['sprites', 'gfx', bower];
  var views = ['templates'];
  var style = ['stylesheets'];
  var js = ['browserify'];
  var live = dev() ? ['browsersync'] : '';

  return gulpSequence(clean, assets, style, js, views, live, cb);

}

gulp.task('default', defaultTask)
module.exports = defaultTask
