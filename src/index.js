const Application = require('./egg').Application;

const app = new Application({
  baseDir: __dirname,
  type: 'application',
});

const port = 6001;

app.ready(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  const server = require('http').createServer(app.callback());
  server.once('error', err => {
    console.log('[app_worker] server got error: %s, code: %s', err.message, err.code);
    process.exit(1);
  });
  server.listen(port, () => {
    console.log(`Starting at http://127.0.0.1:${port}`);
  });
});