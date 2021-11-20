const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ENV = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

module.exports = {
  mode: ENV,  
 
  entry: {
    'index' : fileResolve('src/index.tsx'),
  },
 
  output: {
    path: fileResolve(''),
    filename: 'dist/[name].js',
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
          // MiniCssExtractPlugin.loader,
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: () => {
          //       return [];
          //     }
          //   }
          // },
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx' ],
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'dist/[name].css'
    // }),
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  optimization: {
    moduleIds: 'named',
  },
  devServer: {
    contentBase: path.join(__dirname, '..'),
    port: 9000,
    hot: true,
    open: '/example/index.html'
    // inline: false,
  }
}