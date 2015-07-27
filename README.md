# buildbot
Builds the Exponent client when there are checkins

Runs an API server and runs ngrok to tunnel it to http://exponent-build-bot.ngrok.io/

To start it, run `pm2 buildbot` from the parent directory of this one.

TODO:
- Notify of errors in the build
- Notify in the Exponent instance not the 650 one
- Make it so you can download various versions
