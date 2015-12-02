var config = require('../config');

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var logAlert = require('../libs/logAlert.js');

var releaseTask = function(cb) {

  var tasks = {
    assets: ['sprites.release', 'images.release', 'fonts.release'],
    css: ['css.release'],
    scripts: ['browserify.release'],
    html: ['html.release']
  }

  logAlert('Launch release task ...', 'info', '', 'yellow');

  gulpSequence('bump', 'clean', 'default', tasks.assets, tasks.css, tasks.scripts, tasks.html, cb);
}

gulp.task("release", releaseTask);

module.exports = releaseTask;
