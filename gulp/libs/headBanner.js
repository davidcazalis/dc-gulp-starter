var config = require('../config');
var package = require('../../package');
var header = require('gulp-header');
var gutil = require('gulp-util');
var logAlert = require('./logAlert.js');
var chalk = require('chalk');

module.exports = function(pref, suff) {

  pref = typeof pref !== 'undefined' ? pref : '';
  suff = typeof suff !== 'undefined' ? suff : '';

  var date = new Date();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();
  var time = date.toString().split(" ")[4];

  var dateinfo = day + '/' + month + '/' + year + ' - ' + time;

  var banner = [
    pref,
    '<%= package.name %>',
    'Version : <%= package.version %>',
    'Last build : ' + dateinfo,
    suff,
    '\n'
  ].join('\n');

  return header(banner, {package: package})

}
