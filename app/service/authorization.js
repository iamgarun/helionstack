/**
 * Authorization Egg Service
 */
const { Service } = require('egg');
const _ = require('lodash');

// TODO {validation} add assertions
class AuthorizationService extends Service {
  /* Do Something */
  async index(filter) {
    const { app } = this;
    const { Authorization } = app.model;

    try {
      const authorizations = await Authorization.find(filter);

      if (authorizations.length <= 1) {
        const [authorization] = authorizations;
        return authorization;
      }

      return authorizations;
    } catch (e) {
      // TODO {refactor} use ApplicationErrorClass to throw error
      throw new Error(e.message);
    }
  }

  async create(params) {
    const { app, ctx } = this;
    const { Authorization } = app.model;

    try {
      const existingAuthorization = await this.index({ where: { userId: params.userId, provider: params.provider } });

      if (!_.isEmpty(existingAuthorization)) {
        return existingAuthorization;
      }

      return await Authorization.create({
        provider: params.provider,
        userId: params.id,
        username: params.name,
        profilePic: params.photo,
        accessToken: params.accessToken,
        displayName: params.displayName,
        profile: params.profile,
      }).fetch();
    } catch (e) {
      // TODO {refactor} use ApplicationErrorClass to throw error
      throw new Error(e.message);
    }
  }
}

module.exports = AuthorizationService;
