const Controller = require('egg').Controller;

class SystemController extends Controller {
  async setup() {
    const { ctx } = this;
    const { ErrorType } = ctx.service.helpers;

    try {
      ctx.body = await ctx.service.system.setup();
    } catch (error) {
      console.log(error);
      if (error.isOf(ErrorType.SETUP_ALREADY_COMPLETED)) {
        ctx.status = 404;
      }
    }
  }
}

module.exports = SystemController;
