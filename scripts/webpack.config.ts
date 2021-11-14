
import { Configuration } from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const fileResolve = function (file: string) {
  return path.join(__dirname, '..', file);
};

const config: Configuration = {
  entry: {
    'index' : fileResolve('src/front/index.tsx'),
  },
 
  output: {
    path: fileResolve(''),
    filename: 'dist/front/[name].js',
  },
  module: { 
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              'plugins': []
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [],
              happyPackMode: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            'plugins': []
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js' ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'dist/[name].css'
    })
  ],
}

export default config;
