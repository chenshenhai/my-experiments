import  webpack from 'webpack';
import { merge } from 'webpack-merge';
import webpackConfig from './webpack.config';
 
webpack(merge(webpackConfig, {
  mode: 'production'
})).run((err: any) => {
  console.log(err);
});