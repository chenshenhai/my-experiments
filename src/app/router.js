module.exports = (app) => {

  console.log(app);

  app.get('/001', async ctx => {
    ctx.body = '001';
  });
  app.get('/', app.controller.home.index);

};