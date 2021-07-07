const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();
const HelloWorld = require('./../dist/index.cjs');
const css = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.css'), { encoding: 'utf8' });

const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')

app.use(async (ctx) => {
  const app = createSSRApp({
    data() {
      return { }
    },
    template: `
    <div>
      <hello-world text="MyVue"></hello-world>
    </div>`,
  });
  app.component('hello-world', HelloWorld)
  const appHTML = await renderToString(app);
  const html = `
  <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      ${appHTML}
    </body>
  <html>
  `
  ctx.body = html;
});

const port = 8002;
app.listen(8002, () => {
  console.log(`Starting at port ${port}`)
});