const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    if (!ctx.isAuthenticated() && ctx.request.url.indexOf('/home/login') === -1) {
      ctx.redirect('/home/login');
      return;
    }

    return await ctx.render('home.js', { url: ctx.url, user: ctx.user });
  }
}

module.exports = HomeController;
