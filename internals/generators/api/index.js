/**
 * Language Generator
 */
const fs = require('fs');
const { exec } = require('child_process');
const _ = require('lodash');

module.exports = {
  description: 'Add an Egg Rest API',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message:
        'What is the name of the api that you want to add?',
    },
  ],

  actions: data => {
    const actions = [];
    const apiName = _.camelCase(data.name);
    
    actions.push({
      type: 'add',
      path: `../../app/api/${apiName}/index.js`,
      templateFile: './api/base.hbs',
      abortOnFail: true,
    });
  
    actions.push({
      type: 'prettify',
      path: '/api/',
      base: '/../../app/',
      helper: 'camelCase',
      isServer: true,
    });

    return actions;
  },
};
