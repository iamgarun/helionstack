const { app, assert } = require('egg-mock/bootstrap');

describe('test/index.test.js', async () => {
  it('should have config keys starting with package name', async () => {
    const pkg = require('../package');
    assert(app.config.keys.startsWith(pkg.name));
  });
});
