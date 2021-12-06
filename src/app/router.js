module.exports = app => {

  app.get('/001', async ctx => {
    ctx.body = '001';
  });
  app.get('/', async ctx => {
    ctx.body = 'hello';
  });

};