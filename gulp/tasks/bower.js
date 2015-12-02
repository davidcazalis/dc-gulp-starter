var config = require('../config');

var gulp = require('gulp');
var path = require('path');
var bower = require('gulp-bower');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var errorAlert = require('../libs/errorAlert');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var logAlert = require('../libs/logAlert');

var bowerInstallTask = function() {

  var settings = {
    scr: path.join(config.root.src, config.tasks.bower.src),
    dest: path.join(config.root.src, config.tasks.bower.src),
  }

  logAlert('Installing Bower depedencies', 'info', settings.dest);

  return bower({ directory: settings.src, cwd: './' })
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(gulp.dest(settings.dest))
}

var bowerCleanTask = function() {

  var settings = {
    temp: './bower_components'
  }

  logAlert('Clean Bower temporary folder', 'info', settings.temp);

  return del(settings.temp);
}

gulp.task('bowerClean', bowerCleanTask);
gulp.task('bowerInstall', bowerInstallTask);

gulp.task('bower', gulpSequence('bowerInstall', 'bowerClean'));

module.exports = bowerCleanTask;
module.exports = bowerInstallTask;
