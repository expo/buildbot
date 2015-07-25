/**
 * Buildbot server
 */
'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

const _ = require('lodash-node');
const freeportAsync = require('freeport-async');

const koa = require('koa');
const api = require('@exponent/koa-api');
const identify = require('koa-identify');
const logger = require('koa-logger');
const router = require('koa-router');

const buildAsync = require('./buildAsync');
const ngrokAsync = require('./ngrokAsync');

var BuildbotApi = {

  build: {
    doc: "Runs a build and returns the result if successful",
    methodAsync: _asyncToGenerator(function* (env, args) {
      buildAsync().then(function (result) {}, function (err) {});

      return true;
    })
  },

  add: {
    doc: "Adds two numbers and returns the result",
    methodAsync: function methodAsync(env, args) {
      console.log("Called methodAsync");
      return new _Promise(function (resolve, reject) {
        var sum = 0;
        for (var i = 0; i < args.length; i++) {
          if (!_.isNumber(args[i])) {
            var err = api.ApiError('TYPE_ERROR', args[i] + " is not a number!");
            console.error(err);
            return reject(err);
          } else {
            sum += args[i];
          }
        }
        console.log("Added up", args, "to get", sum);
        return resolve(sum);
      });
    }
  }
};

var app = koa();
app.name = 'buildbot';
app.proxy = true;
app.experimental = true;

app.use(logger());
app.use(identify());
app.use(api(app, BuildbotApi));

if (require.main === module) {
  _asyncToGenerator(function* () {
    var argv = require('minimist')(process.argv.slice(2));
    var port = argv.port || argv.p || (yield freeportAsync(3500));

    var server = app.listen(port, function () {
      var addr = server.address();
      var port = addr.port;
      var host = addr.address;
      console.log('Listening on http://' + host + ':' + port + ' using NODE_ENV=' + process.env.NODE_ENV);
    });

    try {
      var url = yield ngrokAsync({ port: port });
      console.log("Tunneling to port", port, "via ngrok at", url);
    } catch (e) {
      console.error("Failed to start ngrok tunnel!\n", e, e.stack);
      process.exit(-2);
    }
  })().then(function (result) {
    if (result) {
      console.log(result);
    }
  }, function (err) {
    console.error(err, err.stack);
  });
}

module.exports = app;
//# sourceMappingURL=sourcemaps/index.js.map