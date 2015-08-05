let _ = require('lodash-node');
let child_process = require('child_process');
let instapromise = require('instapromise');
let path = require('path');

module.exports = async function (opts) {

  opts = _.assign({
    exponentDir: path.join(process.env.HOME, 'projects', 'exponent'),
  }, opts);

  let result = await child_process.promise.spawn('fastlane', ['ios', 'enterprise'], {
    cwd: opts.exponentDir,
    stdio: 'inherit',
  });

  return result;

}

if (require.main === module) {
  module.exports().then(console.log, console.error);
}
