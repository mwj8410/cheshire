module.exports = {
  api: {
    // Base values
    port: 80,

    // Subsystem varaiables
    mongo: {
      uri: ''
    },

    redis: {
      client: '',
      host: '',
      port: '',
      socket: '',
      url: ''
    },

    sql: {
      uri: '',
      user: '',
      password: ''
    },

    session: {
      secret: 'keyboard cat',
      store: 'redis'
    }
  },
  ui: {},
  view: {}
};
