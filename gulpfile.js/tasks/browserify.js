'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var env = require('gulp-environments');
var dev = env.development;
var prod = env.production;
var errorAlert = require('../libs/errorAlert');
var logAlert = require('../libs/logAlert');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var browserSync = require('browser-sync');
var joinPath = require('path.join');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var glob = require('glob');
var es = require('event-stream');
var flatten = require('gulp-flatten');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var js = config.tasks.js;
var paths = {
  src : joinPath(config.root.src, js.src, js.extensions),
  dest: joinPath(config.root.dest, js.dest)
}

var browserifyBundle = function () {

  glob(paths.src, function(err, files) {

    var tasks = files.map(function(entry) {

      return browserify({ entries: [entry] }).bundle()
        .on('error', function(err) {
          errorAlert(err);
        })
        .pipe(source(entry))
        .pipe(dev(buffer()))
        .pipe(dev(sourcemaps.init({
          loadMaps: true
        })))
        .pipe(rename({
          extname: js.browserify.bundle
        }))
        .pipe(flatten())
        .pipe(dev(sourcemaps.write('./')))
        .pipe(prod(streamify(uglify())))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream({once: true}))
      });

    es.merge(tasks);

  })
}

var browserifyTask = function() {

  var b = watchify(browserify(paths.src, config.tasks.js.browserify.options));

  b.on('update', function(ids) {
    browserifyBundle(b);
  });

  return browserifyBundle(b);

}

gulp.task('browserify', browserifyTask);

module.exports = browserifyTask
