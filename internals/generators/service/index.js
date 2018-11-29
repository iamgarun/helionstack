/**
 * Language Generator
 */
const fs = require('fs');
const { exec } = require('child_process');

module.exports = {
  description: 'Add an Egg Service',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message:
        'What is the name of the service that you want to add?',
    },
  ],

  actions: () => {
    const actions = [];
    actions.push({
      type: 'add',
      path: '../../app/service/{{camelCase name}}.js',
      templateFile: './service/class.hbs',
      abortOnFail: true,
    });
  
    actions.push({
      type: 'prettify',
      path: '/service/',
      base: '/../../app/',
      helper: 'camelCase',
      isServer: true,
    });

    return actions;
  },
};
