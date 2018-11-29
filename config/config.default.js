const path = require('path');
const fs = require('fs');

module.exports = app => {
  // eslint-disable-next-line no-multi-assign
  const config = (exports = {});

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico')),
  };

  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs'),
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public'),
  };

  config.keys = `${app.name}_123456`;

  config.middleware = ['access'];

  config.security = {
    csrf: {
      enable: false, // TODO {important\implementation} find a way to keep this enabled and use react axios
    },
  };

  config.session = {
    key: 'APP_SESS',
  };

  config.frontend = {
    publicPath: '/home/',
    dirPath: 'web',
  };

  config.rest = {
    urlprefix: '/api/', // Prefix of rest api url. Default to /api/
    /* authRequest: async ctx => ctx.isAuthenticated(), */
    // authRequest: async ctx => {
    //   // A truthy value must be returned when authentication succeeds.
    //   // Otherwise the client will be responded with `401 Unauthorized`
    //   return accessToken;
    // }

    // Specify the APIs for which authentication can be ignored.
    // If authRequest is configured, authentication for all APIs is required by default.
    /* authIgnores: null, */
    // authIgnores: {
    //   users: {
    //     show: true, // allow GET /api/users/:id to ignore authentication
    //     index: true,
    //   }
    // }
  };

  config.bcrypt = {
    saltRounds: 13, // default 10
  };

  config.waterline = {
    app: true,
    agent: false,
    Mount: 'model', // model directory
    db: {
      // database configuration, internal support mongodb, mysql
      default: {
        // database name
        adapter: 'mongodb', // database mongodb | mysql
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
    },
  };

  config.passportGithub = {
    key: process.env.GH_KEY,
    secret: process.env.GH_SECRET,
    callbackURL: process.env.GH_CB_URL,
  };

  return config;
};
