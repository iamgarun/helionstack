const { Service } = require('egg');
const _ = require('lodash');

class SystemService extends Service {
  get LINK_TYPE() {
    return {
      APP_ENV: 'AppEnvConfigurations',
    };
  }

  async setup() {
    const { app, ctx } = this;
    const { Setup } = app.model;
    const { helpers } = ctx.service;
    const { ErrorClass } = helpers;

    if (await this.isComplete()) {
      throw new ErrorClass.SetupCompleteError();
    }

    await Setup.create({ completed: true });
  }

  async isComplete() {
    const record = await this.app.model.Setup.find();
    return !_.isEmpty(record);
  }

  async linkExists({ type, parentId, childId }) {
    const { Appenvconfigurations: AppEnvConf } = this.app.model;

    switch (type) {
      case this.LINK_TYPE.APP_ENV:
        const data = await AppEnvConf.findOne({ where: { application: parentId, environment: childId } });
        return !_.isEmpty(data);
    }
  }
}

module.exports = SystemService;
