'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var env = require('gulp-environments');
var dev = env.development;
var prod = env.production;
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
var errorAlert = require('../libs/errorAlert');
var logAlert = require('../libs/logAlert');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');

var joinPath = require('path.join');
var path = require('path');
var gulpSequence = require('gulp-sequence');

var sprites = config.tasks.sprites;
var paths = {
  src : joinPath(config.root.src, sprites.src, "/**/*." + sprites.extensions),
  dest: joinPath(config.root.dest, sprites.dest)
}

var spritesTask = function () {
  return gulp.src(paths.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-'
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('sprites', spritesTask);
gulp.task('reload-sprites', gulpSequence('sprites', 'templates'));

module.exports = spritesTask
