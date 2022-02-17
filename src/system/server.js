const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const { monitor } = require('./monitor');

const app = new Koa();

app.use(koaStatic(path.join(__dirname, 'public')));

app.listen(3001, () => {
  console.log('Start: http://127.0.0.1:3001')
})


monitor();