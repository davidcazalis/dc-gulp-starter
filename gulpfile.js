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
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  jade = require('gulp-jade'),
  gulpif = require('gulp-if'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  data = require('gulp-data'),
  imagemin = require('gulp-imagemin'),
  iconfont = require('gulp-iconfont'),
  shell = require('gulp-shell'),
  bower = require('gulp-bower');

function clean(path, files) {
  gutil.log(gutil.colors.grey('Clean ' + files + ' files.'));
  del([path + '/*.' + files]);
}

// ==========================================================================
// Tasks configuration
// ==========================================================================

// Assets
// ==========================================================================

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
    .pipe(gulp.dest(config.fonts.src))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

// Copy fonts in build directory
gulp.task('fonts', function() {
  return gulp.src(config.fonts.src+'/**/*')
    .pipe(!options.production ? gutil.noop() : gulp.dest(config.fonts.build+''))
});

// CSS
// ==========================================================================

// Compile Sass files into CSS
gulp.task('styles', function() {
  clean(config.styles.dest, 'css');
  return gulp.src(config.styles.src)
    .pipe(!options.production ? plumber() : gutil.noop())
    .pipe(!options.production ? sourcemaps.init() : gutil.noop())
    .pipe(sass({
      outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browser: [config.browserslist],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(!options.production ? gulp.dest(config.styles.dest) : gulp.dest(config.styles.build))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

// HTML
// ==========================================================================

// Compile Jade files into HTML
gulp.task('templates', function() {
  clean(config.templates.dest, 'html');
  return gulp.src(config.templates.src)
    .pipe(data(function(file) {
      return require('./config.json');
    }))
    .pipe(!options.production ? plumber() : gutil.noop())
    .pipe(jade({
      pretty: true
    }))
    .pipe(!options.production ? gulp.dest(config.templates.dest) : gulp.dest(config.templates.build))
    .pipe(!options.production ? browserSync.stream() : gutil.noop());
});

// JavaScript
// ==========================================================================

// Verifying JavaScript files with jshint
gulp.task('scripts:hint', function() {
  return gulp.src(config.scripts.src)
    .pipe(!options.production ? jshint('.jshintrc') : gutil.noop())
    .pipe(!options.production ? jshint.reporter('jshint-stylish') : gutil.noop())
    .pipe(!options.production ? jshint.reporter('fail') : gutil.noop());
});

// Concatenate external JavaScript files
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

// Concatenate custom JavaScript files
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

// Local
// ==========================================================================

// Create a server and watch files
gulp.task('live', function() {
  browserSync.init({
    reloadOnRestart: true,
    server: {
      baseDir: './',
      directory: true
    }
  });

  gulp.watch(config.styles.src, ['styles']);
  gulp.watch(config.templates.dest + '/**/*.jade', ['templates']);
  gulp.watch(config.libs, ['scripts']);
  gulp.watch(config.scripts.src, ['scripts']);
  gulp.watch(config.icons.src, ['iconfont', 'styles']);
  gulp.watch(config.templates.dest + '/*.html').on('change', browserSync.reload);
});

// Dependencies
// ==========================================================================

// Install bower packages
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.libs))
});

// ==========================================================================
// Tasks
// ==========================================================================

gulp.task('assets', ['media', 'iconfont', 'styles', 'fonts']);
gulp.task('scripts', ['scripts:hint', 'scripts:vendor', 'scripts:app']);

gulp.task('default', ['bower','assets', 'templates', 'scripts']);
gulp.task('test', ['default']);

gulp.task('dev', ['default', 'live']);
gulp.task('prod', shell.task([ 'gulp default --production' ]));
