'use strict';

// Add external config file
var config = require('./config.json');

var browserSync = require('browser-sync').create(),
  del = require('del'),
  pngquant = require('imagemin-pngquant'),
  consolidate = require('gulp-consolidate'),
  options = require("minimist")(process.argv.slice(2));

// Gulp
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  jade = require('gulp-jade'),
  gulpif = require('gulp-if'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  run = require('gulp-run'),
  imagemin = require('gulp-imagemin'),
  iconfont = require('gulp-iconfont');

function clean(path, files) {
  gutil.log(gutil.colors.grey('Clean ' + files + ' files.'));
  del([path + '/*.' + files]);
}

// ==========================================================================
// Tasks
// ==========================================================================

// Compile Sass files into CSS
gulp.task('styles', function() {
  clean(config.styles.dest, 'css');
  return gulp.src(config.styles.src)
    .pipe(!options.production ? plumber() : gutil.noop())
    .pipe(!options.production ? sourcemaps.init() : gutil.noop())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browser: [config.browserslist],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(!options.production ? gulp.dest(config.styles.dest) : gulp.dest(config.styles.build))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

// Compile Jade files into HTML
gulp.task('templates', function() {
  clean(config.templates.dest, 'html');
  return gulp.src(config.templates.src)
    .pipe(!options.production ? plumber() : gutil.noop())
    .pipe(jade({
      pretty: true
    }))
    .pipe(!options.production ? gulp.dest(config.templates.dest) : gulp.dest(config.templates.build))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

// JavaScripts things
gulp.task('scripts:hint', function() {
  return gulp.src(config.scripts.src)
    .pipe(!options.production ? jshint('.jshintrc') : gutil.noop())
    .pipe(!options.production ? jshint.reporter('jshint-stylish') : gutil.noop())
    .pipe(!options.production ? jshint.reporter('fail') : gutil.noop())
});

gulp.task('scripts:vendor', function() {
  return gulp.src(config.scripts.vendor)
    .pipe(!options.production ? sourcemaps.init() : gutil.noop())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write())
    .pipe(!options.production ? gutil.noop() : uglify({
      preserveComments: 'some'
    }))
    .pipe(!options.production ? gulp.dest(config.scripts.dest) : gulp.dest(config.scripts.build))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

gulp.task('scripts:app', function() {
  return gulp.src(config.scripts.app)
    .pipe(!options.production ? sourcemaps.init() : gutil.noop())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(!options.production ? gutil.noop() : uglify({
      preserveComments: 'some'
    }))
    .pipe(!options.production ? gulp.dest(config.scripts.dest) : gulp.dest(config.scripts.build))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

gulp.task('scripts', ['scripts:hint', 'scripts:vendor', 'scripts:app']);

// Create a server and watch files
gulp.task('live', function() {
  browserSync.init({
    startPath: config.templates.dest,
    server: {
      baseDir: './',
      directory: true
    }
  });

  gulp.watch(config.styles.src, ['styles']);
  gulp.watch(config.templates.src, ['templates']);
  gulp.watch(config.scripts.src, ['scripts']);
  gulp.watch(config.icons.src, ['iconfont', 'styles']);
  gulp.watch(config.templates.dest + '/*.html').on('change', browserSync.reload);
});

// Images optimisation
gulp.task('media', function() {
  return gulp.src(config.media.src)
    .pipe(gulpif(options.production, imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })))
    .pipe(gulpif(options.production, gulp.dest(config.media.dest)));
});

// Create fonts from SVG icons
gulp.task('iconfont', function() {
  return gulp.src([config.icons.src])
    .pipe(iconfont({
      fontName: config.icons.font.name,
      formats: ['ttf', 'eot', 'woff', 'svg']
    }))
    .on('glyphs', function(glyphs, options) {
      gulp.src(config.icons.dest + '/' + config.icons.font.template)
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: config.icons.font.name,
          fontPath: config.icons.font.path,
          className: config.icons.font.class
        }))
        .pipe(gulp.dest(config.styles.dest))
        .pipe(!options.production ? browserSync.stream() : gutil.noop());
    })
    .pipe(gulp.dest(!options.production ? config.fonts.src : config.fonts.build))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

// Assets
gulp.task('assets', ['media', 'iconfont', 'styles']);

// Tests
gulp.task('test', ['styles', 'templates', 'scripts']);

// Development
gulp.task('dev', ['assets', 'templates', 'scripts', 'live']);

// Default
gulp.task('default', ['styles', 'templates', 'scripts', 'media']);
