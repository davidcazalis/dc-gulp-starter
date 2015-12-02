var notify = require("gulp-notify");
var gutil = require('gulp-util');
var logAlert = require('./logAlert.js');
var chalk = require('chalk');

module.exports = function(error, callback) {

  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: "Bummer ! Task Failed (" + error.plugin + ")",
    message: "Check your console for more details.",
    sound: "Sosumi"
  }).apply(this, args);

  logAlert(chalk.red('Error with ' + error.plugin + "\n") + error.message, 'error');

  if (typeof this.emit === 'function') this.emit('end')
}
