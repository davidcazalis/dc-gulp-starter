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

var imagemin = require('gulp-imagemin');

var gfx = config.tasks.gfx;
var paths = {
  src : joinPath(config.root.src, gfx.src, "/*." + "{" + gfx.extensions + "}"),
  dest: joinPath(config.root.dest, gfx.dest)
}

var gfxTask = function () {
  return gulp.src(paths.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('gfx', gfxTask)

module.exports = gfxTask
