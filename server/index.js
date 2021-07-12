const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();
const HelloWorld = require('./../dist/index.cjs');
const css = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.css'), { encoding: 'utf8' });

const Vue = require('vue');
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')

app.use(async (ctx) => {

  const app1 = createSSRApp({
    data: () => {return {}},
    template: `
    <div>
      <hello-world text="MyVue"></hello-world>
    </div>`,
  });
  app1.component('hello-world', HelloWorld)
  const app1HTML = await renderToString(app1);


  const app2 = createSSRApp({
    data: () => {return {}},
    render() {
      return Vue.h('div', {}, [
        Vue.h(HelloWorld, { text: 'MyVue 222' }, null)
      ])
    }
  });
  const app2HTML = await renderToString(app2);


  


  const html = `
  <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      ${app1HTML}
      <br/>
      ${app2HTML}
    </body>
  <html>
  `
  ctx.body = html;
});

const port = 8002;
app.listen(8002, () => {
  console.log(`Starting at port ${port}`)
});