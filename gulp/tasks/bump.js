var config = require('../config');

var gulp = require('gulp');
var bump = require('gulp-bump');
var logAlert = require('../libs/logAlert.js');

var settings = {
  bower: './bower.json',
  package: './package.json'
}

var bumpTaskReset = function() {

  logAlert('Bump JSON files', 'info', 'patch');

  gulp.src([settings.bower, settings.package])
  .pipe(bump({version: '0.0.0'}))
  .pipe(gulp.dest('./'));

}

var bumpTaskPatch = function() {

  logAlert('Bump JSON files', 'info', 'patch');

  gulp.src([settings.bower, settings.package])
  .pipe(bump({type: 'patch'}))
  .pipe(gulp.dest('./'));

}

var bumpTaskMinor = function() {

  logAlert('Bump JSON files', 'info', 'minor');

  gulp.src([settings.bower, settings.package])
  .pipe(bump({type: 'minor'}))
  .pipe(gulp.dest('./'));

}

var bumpTaskMajor = function() {

  logAlert('Bump JSON files', 'info', 'major');

  gulp.src([settings.bower, settings.package])
  .pipe(bump({type: 'major'}))
  .pipe(gulp.dest('./'));

}

gulp.task("bump.reset", bumpTaskReset);
gulp.task("bump.patch", bumpTaskPatch);
gulp.task("bump", bumpTaskMinor);
gulp.task("bump.major", bumpTaskMajor);

module.exports = bumpTaskMinor;
module.exports = bumpTaskMajor;
module.exports = bumpTaskPatch;
module.exports = bumpTaskReset;
