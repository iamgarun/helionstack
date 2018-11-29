/**
 * Helpers Egg Service
 */
const { Service } = require('egg');
const _ = require('lodash');
const ExtendableError = require('es6-error');

const ErrorTypes = {
  SETUP_ALREADY_COMPLETED: {
    name: 'system/SETUP_ALREADY_COMPLETED',
    message: 'Setup already completed',
  },
  USER_ALREADY_EXISTS: {
    name: 'user/USER_ALREADY_EXISTS',
    message: 'User already exists',
  },
  RESOURCE_NOT_FOUND: {
    name: 'system/RESOURCE_NOT_FOUND',
    message: 'Resource not found',
  },
};

class ApplicationErrorClass extends ExtendableError {
  constructor(type) {
    super(type.message);
    this.type = type;
  }

  isOf(errorType) {
    return errorType.name === this.type.name;
  }
}

class RequestErrorClass extends ExtendableError {
  constructor(type, ctx) {
    super(type.message);
    this.type = type;
    this.ctx = ctx;
  }

  isOf(errorType) {
    return errorType.name === this.type.name;
  }
}

// TODO {validation} add assertions
class HelpersService extends Service {
  /* Do Something */
  maskPassword(user) {
    const info = user;

    info.authorizations = _.map(user.authorizations, authorization => {
      const auth = authorization;

      if (auth.provider === 'local') {
        delete auth.password;
        return auth;
      }

      return authorization;
    });

    return info;
  }

  get ErrorType() {
    return ErrorTypes;
  }

  get ErrorClass() {
    class SetupCompleteError extends ApplicationErrorClass {
      constructor() {
        super(ErrorTypes.SETUP_ALREADY_COMPLETED);
      }
    }

    class UserExistsError extends ApplicationErrorClass {
      constructor() {
        super(ErrorTypes.USER_ALREADY_EXISTS);
      }
    }

    class ResourceNotFoundError extends RequestErrorClass {
      constructor(ctx) {
        super(ErrorTypes.RESOURCE_NOT_FOUND, ctx);
        ctx.status = 404;
        ctx.body = { message: ErrorTypes.RESOURCE_NOT_FOUND.message };
      }
    }

    return {
      SetupCompleteError,
      UserExistsError,
      ResourceNotFoundError,
    };
  }
}

module.exports = HelpersService;
