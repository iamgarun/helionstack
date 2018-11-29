/**
 * Egg REST API [users/authorizations]
 * Url: /api/users/:id/authorizations
 */

/**
 *  Rest API: /api/users/:id/authorizations
 *  Method: GET
 *  Description:
 *  Fetch a list of authorizations for the given User
 *
 *  @async
 *  @function index
 *  @param {object} ctx - egg application context object
 *  @return {Promise} List of Authorizations
 */
const index = async ctx => {
  /* Do Something */
};

module.exports = () => ({
  index,
});
