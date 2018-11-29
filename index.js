const egg = require('egg');

/* Start Cluster programmatically */
egg.startCluster({
  sticky: true,
  baseDir: __dirname,
  workers: process.env.WORKERS,
  port: process.env.PORT,
});
