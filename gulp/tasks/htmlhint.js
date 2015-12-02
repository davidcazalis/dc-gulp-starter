var config = require('../config');

var gulp = require('gulp');
var path = require('path');
var htmlhint = require('gulp-htmlhint');
var logAlert = require('../libs/logAlert');

var htmlHintTask = function() {

  var settings = {
    src: path.join(config.root.dest, config.tasks.html.dest, '/**/*.html'),
    rc: path.join(config.root.gulp, '.htmlhintrc'),
  }

  logAlert('Testing HTML.', 'info', settings.src);

  return gulp.src(settings.src)
    .pipe(htmlhint(settings.rc))
    .pipe(htmlhint.reporter('htmlhint-stylish'))
}

gulp.task('htmlhint', htmlHintTask);

module.exports = htmlHintTask;
