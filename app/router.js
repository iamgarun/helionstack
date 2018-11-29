module.exports = app => {
  const { router, controller } = app;
  /* const jwt = app.passport.authenticate('jwt', { session: false, successReturnToOrRedirect: null }); */

  // Mounting passport authentication routes
  app.passport.mount('github');

  router.get('/auth/check', controller.auth.check);
  router.get('/system/setup', controller.system.setup);

  app.redirect('/', '/home/dashboard', 302);
  app.get('/home(/.+)?', app.controller.home.index);
};
