import path from 'path';
import Webpack from 'webpack';
import { merge } from 'webpack-merge'
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';

const compiler = Webpack(merge(webpackConfig, {
  mode: 'development'
}));
const devServerOptions = {
  compress: true,
  static: {
    directory: path.join(__dirname, '..'),
  },
  open: ['/example/index.html'],
  port: 9000,
  hot: true,
};
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};

runServer();