var config = require('../config');

var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
var notify = require("gulp-notify");
var scsslint = require('gulp-scss-lint');
var scssLintStylish = require('gulp-scss-lint-stylish');
var logAlert = require('../libs/logAlert');

var scsslintTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.css.src, '/**/*.scss')
  }

  logAlert('Testing Sass.', 'info', settings.src);

  return gulp.src(settings.src)
    .pipe(scsslint({
      'config': config.root.gulp + '/scss.yml',
      customReport: scssLintStylish
    }))
}


gulp.task('scsslint', scsslintTask);

module.exports = scsslintTask;
