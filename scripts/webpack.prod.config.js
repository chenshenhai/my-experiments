const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const ENV = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

module.exports = {
  mode: ENV, 
  devtool: 'inline-cheap-module-source-map',  
  entry: {
    'index' : fileResolve('src/index.js'),
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
            ],
            'plugins': []
          }
        }
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          "less-loader",
        ]
      },
    ]
  },
  
  resolve: {
    extensions: ['.jsx', '.js', '.vue' ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'dist/[name].css'
    })
  ],
}