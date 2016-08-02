'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var env = require('gulp-environments');
var dev = env.development;
var prod = env.production;
var watch  = require('gulp-watch');
var browserSync = require('browser-sync');
var joinPath = require('path.join');

var logAlert = require('../libs/logAlert');

var browserSyncTask = function () {
  browserSync.init(config.tasks.browserSync);
  gulp.watch(joinPath(config.root.src, config.tasks.stylesheets.src, "/**/*." + "{" + config.tasks.sass.extensions + "}"), ['stylesheets']);
  gulp.watch(joinPath(config.root.src, config.tasks.stylesheets.src, "/**/*." + "{" + config.tasks.postcss.extensions + "}"), ['stylesheets']);
  gulp.watch(joinPath(config.root.src, config.tasks.templates.src, "/**/*." + "{" + config.tasks.templates.extensions + "}"), ['templates']);
  gulp.watch(joinPath(config.root.src, config.tasks.templates.src, "/**/data.json"), ['templates']);
  gulp.watch(joinPath(config.root.src, config.tasks.gfx.src, "/*." + "{" + config.tasks.gfx.extensions + "}"), ['gfx']);
  gulp.watch(joinPath(config.root.src, config.tasks.sprites.src, "/**/*." + config.tasks.sprites.extensions), ['reload-sprites']);
  gulp.watch(joinPath(config.root.src, config.tasks.js.src, "/**/*.js"), ['browserify']);
  gulp.watch('./bower_components/**/*', ['bowerbuild']);
  gulp.watch('./bower_components/**/*.js').on('change', browserSync.reload);
  gulp.watch(config.root.dest + "/**/*.html").on('change', browserSync.reload);
}

gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('browsersync', ['setWatch'], browserSyncTask);

module.exports = browserSyncTask
