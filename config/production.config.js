module.exports = {
  api: {
    port: 80,
    mongo_uri: '',

    sql_uri: '',
    sql_user: '',
    sql_password: '',

    session: {
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true
      }
    }
  },
  ui: {},
  view: {

  }
};
