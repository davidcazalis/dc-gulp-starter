var config = require('../config');

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var errorAlert = require('../libs/errorAlert');
var logAlert = require('../libs/logAlert');
var browserSync = require('browser-sync').create();
var watchify = require('watchify');
var head = require('../libs/headBanner');
var bytediff = require('gulp-bytediff');

var settings = {
  src: path.join(config.root.src, config.tasks.scripts.src, '/**/*.{' + config.tasks.scripts.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.scripts.dest),
  file: config.tasks.scripts.main,
  entry: path.join(config.root.src, config.tasks.scripts.src, config.tasks.scripts.main)
}

function browserifyBundle(browserify)  {

  logAlert('Generating bundle with Browserify', 'info', settings.file);

  return browserify.bundle()
    .on('error', errorAlert)
    .pipe(source(settings.file))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(head('/**', '*/'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream({
      once: true
    }));
}

var browserifyTask = function() {

  var b = watchify(browserify(settings.entry, config.tasks.scripts.browserify));

  b.on('update', function(ids) {
    browserifyBundle(b);
  });

  b.on('time', function(time) {
    var prettyTime = (time/1000)%60 + 's';
    logAlert('Bundle generated in', 'info', prettyTime);
  });

  return browserifyBundle(b);

}

var browserifyTaskBuild = function() {

  var b = browserify(settings.entry, config.tasks.scripts.browserify);

  return browserifyBundle(b);

}

var browserifyTaskRelease = function() {

  var settings = {
    src: path.join(config.root.dest, config.tasks.scripts.dest, '/**/*.js'),
    dest: path.join(config.root.public, config.tasks.scripts.dest)
  }

  logAlert('JavaScript release.', 'info', settings.dest, 'yellow');

  return gulp.src(settings.src)
    .pipe(bytediff())
    .pipe(uglify())
    .pipe(bytediff.stop())
    .pipe(head('/**', '*/'))
    .pipe(gulp.dest(settings.dest))

}

gulp.task('browserify', browserifyTask);
gulp.task('browserify.build', browserifyTaskBuild);
gulp.task('browserify.release', browserifyTaskRelease);

module.exports = browserifyTask;
module.exports = browserifyTaskBuild;
module.exports = browserifyTaskRelease;
