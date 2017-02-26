module.exports = {
  api: {
    // Base values
    port: 3000,

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
      store: process.env.CIRCLECI && 'memory' || 'redis'
    }
  },
  ui: {},
  view: {}
};
