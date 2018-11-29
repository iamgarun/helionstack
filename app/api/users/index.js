/**
 * Egg REST API [users]
 * Url: /api/users
 */
const _ = require('lodash');

/**
 * Create rule for parameter validation
 * Supported Methods: [ POST, PUT ]
 *
 * @name createRule
 */
exports.createRule = {
  username: {
    type: 'email',
    required: true,
  },
  password: {
    type: 'password',
    required: true,
  },
  provider: {
    type: 'string',
    required: true,
  },
  displayName: {
    type: 'string',
    required: true,
  },
};

/**
 *  Rest API: /api/users
 *  Method: GET
 *  Description:
 *  Fetch a list of Users based on the filter
 *
 *  @async
 *  @function index
 *  @param {object} ctx - egg application context object
 *  @return {Promise} List of Users
 */
exports.index = async ctx => {
  ctx.data = _.map(await ctx.service.user.index(), ctx.service.helpers.maskPassword);
};

/**
 *  Rest API: /api/users
 *  Method: POST
 *  Description:
 *  Create a new resource for Users, based on params validated using {@link createRule}
 *
 *  @async
 *  @function index
 *  @param {object} ctx - egg application context object
 *  @return {Promise} Resource created for Users
 */
exports.create = async ctx => {
  const { username, provider, password, displayName } = ctx.params.data;

  try {
    await ctx.service.user.create(username);
    await ctx.service.authorization.create(username, { provider, password, displayName });
    ctx.data = _.map(await ctx.service.user.index({ where: { username } }), ctx.service.helpers.maskPassword);
  } catch (error) {
    console.log(error);
  }
};

/**
 *  Rest API: /api/users
 *  Method: DELETE
 *  Description:
 *  Delete a resource for Users with passed {:id}
 *
 *  @async
 *  @function destroy
 *  @param {object} ctx - egg application context object
 *  @return {Promise} Resource deleted for Users
 */
exports.destroy = async ctx => {
  const { id } = ctx.params;

  try {
    await ctx.service.user.destroy({ where: { id } });
    ctx.data = { message: 'user has been removed successfully' };
  } catch (error) {
    console.log(error);
  }
};
