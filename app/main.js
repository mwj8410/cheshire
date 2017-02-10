const express = require('express');
const http = require('http');
const path = require('path');

var routsDef = require('./rout.config');

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
global.config = config;

routsDef(express, router, staticContentPath);

server.listen(config.port, '0.0.0.0');

module.exports = server;
