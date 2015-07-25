/**
 * Buildbot server
 */
'use strict';

const _ = require('lodash-node');
const freeportAsync = require('freeport-async');

const koa = require('koa');
const api = require('@exponent/koa-api');
const identify = require('koa-identify');
const logger = require('koa-logger');
const router = require('koa-router');

const buildAsync = require('./buildAsync');
const ngrokAsync = require('./ngrokAsync');

let BuildbotApi = {

    build: {
      doc: "Runs a build and returns the result if successful",
      methodAsync: async function (env, args) {
        buildAsync().then((result) => {

        }, (err) => {
        });

        return true;

      },
    },

    add: {
      doc: "Adds two numbers and returns the result",
      methodAsync: function (env, args) {
        console.log("Called methodAsync");
        return new Promise(function (resolve, reject) {
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
      },
   },
};

var app = koa();
app.name = 'buildbot';
app.proxy = true;
app.experimental = true;

app.use(logger());
app.use(identify());
app.use(api(app, BuildbotApi));

if (require.main === module) {
  (async function () {
    let argv = require('minimist')(process.argv.slice(2));
    let port = argv.port || argv.p || await freeportAsync(3500);

    let server = app.listen(port, function () {
      let addr = server.address();
      let port = addr.port;
      let host = addr.address;
      console.log('Listening on http://' + host + ':' + port + ' using NODE_ENV=' + process.env.NODE_ENV);
    });

    try {
      let url = await ngrokAsync({port});
      console.log("Tunneling to port", port, "via ngrok at", url);
    } catch (e) {
      console.error("Failed to start ngrok tunnel!\n", e, e.stack);
      process.exit(-2);
    }

  })().then((result) => {
    if (result) {
      console.log(result);
    }
  }, (err) => {
    console.error(err, err.stack);
  });
}

module.exports = app;
