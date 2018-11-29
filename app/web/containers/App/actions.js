import * as constants from './constants';

export const loginUser = (provider, credentials) => {
  return {
    type: constants.USER_STATE_LOGGING_IN,
    provider,
    credentials,
  };
};
