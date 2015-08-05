'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _ = require('lodash-node');
var child_process = require('child_process');
var instapromise = require('instapromise');
var path = require('path');

module.exports = _asyncToGenerator(function* (opts) {

  opts = _.assign({
    exponentDir: path.join(process.env.HOME, 'projects', 'exponent')
  }, opts);

  var result = yield child_process.promise.spawn('fastlane', ['ios', 'enterprise'], {
    cwd: opts.exponentDir,
    stdio: 'inherit'
  });

  return result;
});

if (require.main === module) {
  module.exports().then(console.log, console.error);
}
//# sourceMappingURL=sourcemaps/buildAsync.js.map