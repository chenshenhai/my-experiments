const path = require('path');
const { createServer, defineConfig } = require('vite');

dev();

async function dev() {
  const viteConfig = getViteConfig();
  const server = await createServer(viteConfig)
  await server.listen()
  server.printUrls();
  const { port, host = '127.0.0.1' } = server.config?.server || {}
  console.log(
    `Open: ` + `http://${host}:${port}/index.html`
  );
}

function getViteConfig() {
  const viteConfig = defineConfig({
    configFile: false,
    root: resolve(),
    publicDir: resolve('example'),
    server: {
      port: 8080,
      host: '127.0.0.1',
    },
    plugins: [],
    esbuild: {
      include: [
        /\.ts$/,
        /\.js$/,
      ],
      exclude: [
        /\.html$/
      ]
    },
  });
  return viteConfig;
}

function resolve(...args) {
  return path.join(__dirname, '..', ...args);
}