
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const serviceGenerator = require('./service/index');
const apiGenerator = require('./api/index');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('service', serviceGenerator);
  plop.setGenerator('api', apiGenerator);
  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../app/web/containers/${comp}`),
        fs.F_OK,
      );
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = config.isServer ? `${path.join(
      __dirname,
      config.base,
      config.path,
      plop.getHelper(config.helper || 'properCase')(answers.name),
      '**.js',
    )}` : `${path.join(
      __dirname,
      '/../../app/web/',
      config.path,
      '**.js',
    )}`;
    exec('yarn fix');
    return folderPath;
  });
};
