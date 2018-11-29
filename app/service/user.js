const { Service } = require('egg');
const _ = require('lodash');

// TODO {validation} add assertions
class UserService extends Service {
  // TODO {logging}
  async create(username) {
    const { app, ctx } = this;
    const { User } = app.model;
    const { ErrorClass } = ctx.service.helpers;

    const users = await this.index({ where: { username } });

    if (!_.isEmpty(users)) {
      throw new ErrorClass.UserExistsError();
    }

    return await User.create({ username }).fetch();
  }

  async index(filter, type) {
    const { app } = this;
    const { User } = app.model;
    const result = { data: [] };

    result.data = await User.find(filter).populate('authorizations');

    if (type === 'one') {
      [result.data] = result.data;
    }

    return result.data;
  }

  async destroy(filter) {
    const { app } = this;
    const { User, Authorization } = app.model;

    const existingUser = await this.index(filter, 'one');
    const { authorizations = [] } = existingUser;

    const normalized = {
      authorizations: _.map(authorizations, rec => rec.id),
    };

    await User.destroy({ id: existingUser.id });
    await User.removeFromCollection(existingUser.id, 'authorizations', normalized.authorizations);

    await Authorization.destroy({ id: { in: normalized.authorizations } });
    await Authorization.removeFromCollection(normalized.authorizations, 'user', existingUser.id);

    return { message: 'User has been removed' };
  }

  async exists(userId) {
    const { app } = this;
    const { User } = app.model;

    const existingUser = await User.findOne({ where: { id: userId } });

    return !_.isEmpty(existingUser);
  }
}

module.exports = UserService;
