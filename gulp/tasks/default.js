var config = require('../config');

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var logAlert = require('../libs/logAlert.js');

var defaultTask = function(cb) {

  var tasks = {
    assets: ['sprites', 'images', 'fonts'],
    css: ['icons', 'css'],
    scripts: ['browserify.build'],
    html: ['html']
  }

  logAlert('Launch default task ...', 'info');

  gulpSequence('clean', 'bower', tasks.assets, tasks.css, tasks.scripts, tasks.html, cb);

}

gulp.task('default', defaultTask);
gulp.task('build', ['default'])

module.exports = defaultTask;
