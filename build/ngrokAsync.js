'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var instapromise = require('instapromise');
var ngrok = require('@exponent/ngrok');

const SUBDOMAIN = 'exponent-build-bot';
const PORT = 3500;

module.exports = _asyncToGenerator(function* (opts) {
  opts = _Object$assign({
    subdomain: SUBDOMAIN,
    port: PORT
  }, opts);
  return ngrok.promise.connect(opts);
});
//# sourceMappingURL=sourcemaps/ngrokAsync.js.map