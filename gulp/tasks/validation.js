var config = require('../config');

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var logAlert = require('../libs/logAlert.js');

var validationTask = function(cb) {


  var tasks = {
    js: ['jslint'],
    html: ['html', 'htmlhint'],
    sass: ['scsslint'],
  }

  logAlert('Launch validation task ...', 'info', '', 'yellow');

  gulpSequence(tasks.js, tasks.sass, tasks.html, cb);

}

gulp.task("validation", validationTask);

module.exports = validationTask;
