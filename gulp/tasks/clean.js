var config = require('../config');
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var gutil = require("gulp-util");
var logAlert = require('../libs/logAlert');
var errorAlert = require('../libs/errorAlert');

var cleanTask = function () {

  var settings = {
    src: [config.root.dest, config.root.public]
  }

  logAlert('Clean build folders', 'info', settings.src);

  return del(settings.src);
}

gulp.task('clean', cleanTask);

module.exports = cleanTask;
