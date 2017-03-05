/* global global, process, require */

const express = require('express');
const http = require('http');
const path = require('path');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

var routesDef = require('./route.config');

var config = require('../config/production.config').api,
  router = express(),
  server = http.createServer(router),
  staticContentPath = `${__dirname}${path.sep}hosted`; // Allows for MS and *nix hosting environments

// Override production configuration with local configuration if available
try {
  var localConfig = require('../config/local.config').api;
  config = Object.assign(config, localConfig);
  if (!global.silent) {
    process.stdout.write('Production configuration using local values.\n');
  }
} catch (ex) {}
// Make the configuration object global
global.config = config;

// Configure for session
var sessionConfig = {
  secret: global.config.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
};
if (global.config.session.store === 'redis') {
  // Config documentation at: https://www.npmjs.com/package/connect-redis
  sessionConfig.store = new new RedisStore({
    client: global.config.redis.client,
    host: global.config.redis.host,
    port: global.config.redis.port,
    socket: global.config.redis.socket,
    url: global.config.redis.url
  });
}
router.use(session(sessionConfig));

// Mount all routs
routesDef(express, router, staticContentPath);

// Start the server
server.listen(config.port, '0.0.0.0');

// Make the server available to testing environments
module.exports = server;
