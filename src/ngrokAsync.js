let instapromise = require('instapromise');
let ngrok = require('@exponent/ngrok');

const SUBDOMAIN = 'exponent-build-bot';
const PORT = 3500;

module.exports = async function (opts) {
  opts = Object.assign({
    subdomain: SUBDOMAIN,
    port: PORT,
  }, opts);
  return ngrok.promise.connect(opts);
};
