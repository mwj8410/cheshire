const bodyParser = require('body-parser');
const prefix = '/api';

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

  router.use('/app', express.static(staticContentPath));

  // Rout Index
  router.get(`${prefix}/user`, require('./controllers/user/user.get'));
};
