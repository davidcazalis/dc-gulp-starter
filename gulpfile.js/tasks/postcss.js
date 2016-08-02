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
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var opacity = require('postcss-opacity')
var fontMagician = require('postcss-font-magician');
var cssnext = require('postcss-cssnext');
var precss = require('precss');
var atImport = require("postcss-import");
var lost = require('lost');

var postcssConfig = config.tasks.postcss;

var paths = {
  src : joinPath(config.root.src, postcssConfig.src, "/**/*." + "{" + postcssConfig.extensions + "}"),
  dest: joinPath(config.root.dest, postcssConfig.dest),
  fonts : joinPath(config.root.dest, config.tasks.fonts.dest)
}

var postcssTask = function () {

  // Postcss plugins
  var postcssPlugins = [
    atImport(),
    lost(),
    fontMagician({
      hosted: paths.fonts
    }),
    opacity({
      legacy: true
    }),
    cssnext({
      browsers: config.tasks.stylesheets.browsers,
      warnForDuplicates: false
    }),
    precss()
  ];

  // Postcss plugins that will run only on production environment
  var postcssPluginsProd = [
    cssnano()
  ];

  return gulp.src(paths.src)
    .pipe(plumber({
      errorHandler: errorAlert
    }))
    .pipe(dev(sourcemaps.init()))
    .pipe(postcss(postcssPlugins))
    .pipe(prod(postcss(postcssPluginsProd)))
    .pipe(dev(sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('postcss', postcssTask);
module.exports = postcssTask;
