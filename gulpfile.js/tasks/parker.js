'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var env = require('gulp-environments');
var dev = env.development;
var prod = env.production;
var joinPath = require('path.join');
var errorAlert = require('../libs/errorAlert');
var logAlert = require('../libs/logAlert');
var plumber = require('gulp-plumber');
var parker = require('gulp-parker');

var stylesheets = config.tasks.stylesheets;
var paths = {
  src : joinPath(config.root.dest, stylesheets.dest, "/**/*." + "{" + stylesheets.extensions + "}"),
  dest: joinPath(config.root.dest, stylesheets.dest)
}

var cssParkerTask = function() {
  return gulp.src(paths.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(parker({
      file: paths.dest + '/parker.md',
      title: 'Parker report',
      metrics: [
        "TotalRules",
        "TotalDeclarations",
        "SelectorsPerRule",
        "IdentifiersPerSelector",
        "SpecificityPerSelector",
        "TopSelectorSpecificity",
        "TopSelectorSpecificitySelector",
        "TotalUniqueColours",
        "TotalImportantKeywords"
      ]
    }))
}

gulp.task('parker', cssParkerTask);
module.exports = cssParkerTask
