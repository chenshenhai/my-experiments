const path = require('path');
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
      }
    ]
  },
  
  resolve: {
    extensions: ['.jsx', '.js', '.vue' ],
  },
  plugins: [],

  devServer: {
    contentBase: path.join(__dirname, '..'),
    port: 9000,
    hot: false,
    inline: false,
  }
}