var gutil = require('gulp-util');
var chalk = require('chalk');
var logSymbols = require('log-symbols');
var package = require('../../package.json');

module.exports = function(msg, symbol, data, color) {

  data = typeof data !== 'undefined' ? data : '';
  color = typeof color !== 'undefined' ? color : 'cyan';

  var logIcon = logSymbols[symbol];
  var logSk = symbol == 'error' ? chalk.bold.red : chalk.blue;
  var logMsg = symbol == 'error' ? chalk.grey : chalk[color];
  var logData = chalk.magenta;

  var prefix = '[' + logSk(package.name) + ']';

  gutil.log(prefix, logIcon, logMsg(msg.toString()), logData(data.toString()));

}
