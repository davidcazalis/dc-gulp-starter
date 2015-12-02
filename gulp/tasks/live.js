var config = require('../config');

var gulp = require('gulp');
var path = require('path');
var browserSync = require('browser-sync');
var watch  = require('gulp-watch');
var gulpSequence = require('gulp-sequence');
var logAlert = require('../libs/logAlert.js');

var liveTask = function()  {

  logAlert('Watch for changes ...', 'info');

  var bs = browserSync.init(config.tasks.browserSync);

  var watchTasks = ['css', 'html', 'icons', 'sprites', 'fonts', 'images', 'browserify'];

  watchTasks.forEach(function(taskName) {
    var task = config.tasks[taskName]
    if (task)  {
      var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
      watch(glob, function() {
        require('./' + taskName)()
      })
    }
  });

  browserSync.watch(path.join(config.root.dest, '/**/*.html')).on('change', browserSync.reload);
  browserSync.watch(path.join(config.root.dest, config.tasks.scripts.dest, '/**/*.js')).on('change', browserSync.reload);

}

var liveTaskRelease = function() {
  browserSync.init({
    online: true,
    tunnel: true,
    open: "tunnel",
    ghostMode: false,
    server: {
      baseDir: config.root.public,
      index: "index.html"
    }
  });
}

gulp.task('live', liveTask);
gulp.task('live.release', liveTaskRelease);

gulp.task('watch', gulpSequence('browserify', 'live'));

module.exports = liveTask;
module.exports = liveTaskRelease;
