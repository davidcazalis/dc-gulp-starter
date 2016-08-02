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

var gulpSequence = require('gulp-sequence');

var mainBowerFiles = require('main-bower-files');
var bower = require('gulp-bower');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');

var paths = {
  dest: joinPath(config.root.dest, config.tasks.libs.dest)
}

var bowerTask = function () {
  return bower();
}

var bowerBundleJsTask = function() {
  return gulp.src(mainBowerFiles({
      paths: {
        bowerrc: './.bowerrc',
        bowerJson: './bower.json'
      }
    }))
    .pipe(dev(sourcemaps.init()))
    .pipe(filter('**/*.js'))
    .pipe(concat('app.libs.js'))
    .pipe(prod(uglify()))
    .pipe(dev(sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

var bowerBundleCSSTask = function() {
  return gulp.src(mainBowerFiles({
      paths: {
        bowerDirectory: './bower_components',
        bowerrc: './.bowerrc',
        bowerJson: './bower.json'
      }
    }))
    .pipe(dev(sourcemaps.init()))
    .pipe(filter('**/*.css'))
    .pipe(concat('app.libs.css'))
    .pipe(prod(cssnano({autoprefixer: false})))
    .pipe(dev(sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('bower', bowerTask);
gulp.task('bowerjs', bowerBundleJsTask);
gulp.task('bowercss', bowerBundleCSSTask);

gulp.task('bowerbuild', gulpSequence('bowerjs', 'bowercss'));
gulp.task('bowerbundle', gulpSequence('clean.bower', 'bower', 'bowerbuild'));

module.exports = bowerTask;
module.exports = bowerBundleJsTask;
