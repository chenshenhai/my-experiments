const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ENV = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

module.exports = {
  mode: ENV,  
 
  entry: {
    'index' : fileResolve('src/index.jsx'),
  },
 
  output: {
    path: fileResolve(''),
    filename: 'dist/[name].js',
  },
  module: { 
    rules: [ 
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
    extensions: ['.jsx', '.js' ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'dist/[name].css'
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, '..'),
    port: 9000,
    hot: false,
    inline: false,
  }
}