const bodyParser = require('body-parser');
const prefix = '/api';

// Configure HTTP request headers
module.exports = (express, router, staticContentPath) => {
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', [
        'Authorization',
        'Content-Type',
        'Content-Length',
        'X-Requested-With'
      ].join(',')
    );
    next();
  });

  // for parsing application/json
  router.use(bodyParser.json());
  // for parsing application/x-www-form-urlencoded
  router.use(bodyParser.urlencoded({ extended: true }));

  // Host static files
  router.use('/app', express.static(staticContentPath));

  // Route Index
  router.delete(`${prefix}/session`, require('./controllers/session/session.delete'));
  router.get(`${prefix}/session`, require('./controllers/session/session.get'));

  router.get(`${prefix}/user`, require('./controllers/user/user.get'));
};
