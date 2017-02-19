const express = require('express');
const http = require('http');
const path = require('path');
const session = require('express-session');

var routesDef = require('./route.config');

var config = require('../config/production.config').api,
  router = express(),
  server = http.createServer(router),
  staticContentPath = `${__dirname}${path.sep}hosted`; // Allows for MS and *nix hosting environemnts

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
router.use(session(global.config.session));

// Mount all routs
routesDef(express, router, staticContentPath);

// Start the server
server.listen(config.port, '0.0.0.0');

// Make the server available to testing environments
module.exports = server;
