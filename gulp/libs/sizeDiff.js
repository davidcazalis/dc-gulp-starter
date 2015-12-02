
var logAlert = require('./logAlert.js');
var formatBytes = require('./formatBytes');

module.exports = function(data) {
  var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
  var msg = data.fileName + ' is ' + Math.round(data.percent) + '%' + difference;

  return logAlert(msg, 'info', formatBytes(data.savings) + ' (' + formatBytes(data.endSize) + ' saved)');
}
