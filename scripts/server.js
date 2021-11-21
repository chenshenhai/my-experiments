const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const app = new Koa();
const HelloWorld = require('./../dist/index.cjs');
const css = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.css'), { encoding: 'utf8' });


app.use(async (ctx) => {

  const appHTML = ReactDOMServer.renderToStaticMarkup(
    React.createElement(HelloWorld, { text: 'MyReact' }, null),
  );
  
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