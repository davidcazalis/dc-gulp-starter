var config = require('../config');

var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
var logAlert = require('../libs/logAlert');

var jslintTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.scripts.src, '/**/*.js'),
    rc: path.join(config.root.gulp, '.jshintrc'),
  }

  logAlert('Testing JavaScript.', 'info', settings.src);

  return gulp.src(settings.src)
    .pipe(jshint(settings.rc))
    .pipe(jshint.reporter('jshint-stylish'))
}

gulp.task('jslint', jslintTask);

module.exports = jslintTask;
