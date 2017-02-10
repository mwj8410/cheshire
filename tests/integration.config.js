global.silent = true;
process.env.NODE_ENV = 'test';

var server = require('../app/main');

before(() => {
  global.server = server;
});

after(() => {
  server.close();
});

require('./integration/user.spec');
