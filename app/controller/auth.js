const Controller = require('egg').Controller;

class AuthController extends Controller {
  async check() {
    const { ctx } = this;

    if (!ctx.isAuthenticated()) {
      ctx.status = 401;
      ctx.body = { message: 'not logged in' };
      return;
    }

    ctx.body = ctx.user;
  }

  async logout() {
    const { ctx } = this;
    const { app } = ctx;
    const { frontend } = app.config;

    ctx.logout();
    ctx.redirect(`${frontend.publicPath}`);
  }
}

module.exports = AuthController;
