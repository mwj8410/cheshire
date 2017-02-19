global.silent = true;
process.env.NODE_ENV = 'test';

var server = require('../app/main');

before(() => {
  global.server = server;
});

after(() => {
  server.close();
});

require('./integration/00_main.spec');
require('./integration/session.spec');
require('./integration/user.spec');
