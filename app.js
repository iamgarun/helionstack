const assert = require('assert');
const path = require('path');
const _ = require('lodash');

require('./utils/behind-proxy')();

module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    // Check user
    assert(user.provider, 'user.provider should exists');
    assert(user.id, 'user.id should exists');

    const existingAuthorization = await ctx.service.authorization.index({
      where: { provider: user.provider, userId: user.id },
    });

    if (!_.isEmpty(existingAuthorization)) {
      return existingAuthorization;
    }

    return await ctx.service.authorization.create(user);
  });

  /* // Serialize and store the user information into session. Generally, only a few fields need to be streamlined/saved.
  app.passport.serializeUser(async (ctx, user) => {
    // process user
    // ...
    // return user;
  });

  // Deserialize the user information from the session, check the database to get the complete information
  app.passport.deserializeUser(async (ctx, user) => {
    // process user
    // ...
    // return user;
  }); */
};
