'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var env = require('gulp-environments');
var dev = env.development;
var prod = env.production;
var browserSync = require('browser-sync');
var joinPath = require('path.join');
var errorAlert = require('../libs/errorAlert');
var logAlert = require('../libs/logAlert');
var plumber = require('gulp-plumber');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

var sassConf = config.tasks.sass;
var paths = {
  src : joinPath(config.root.src, sassConf.src, "/**/*." + "{" + sassConf.extensions + "}"),
  dest: joinPath(config.root.dest, sassConf.dest)
}

var sassTask = function () {
  return gulp.src(paths.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(dev(sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer(config.tasks.stylesheets.browsers))
    .pipe(prod(cssnano({autoprefixer: false})))
    .pipe(dev(sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('sass', sassTask);
module.exports = sassTask;
