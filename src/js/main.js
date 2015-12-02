'use strict';

require('browsernizr');

var $ = require('jquery');
var fitvids = require('./fitvids');
var fastclick = require('./fastclick');

fitvids('body');
fastclick();
