const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');

const app = new Koa();

app.use(koaStatic(path.join(__dirname, 'public-monitor')));

app.listen(3002, () => {
  console.log('Start: http://127.0.0.1:3002')
});

process.on('message', (data) => {
  console.log('system:', data);
});

