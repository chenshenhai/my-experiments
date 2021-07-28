const path = require('path');

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

module.exports = {

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
        test: /\.(less|css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: false },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                sourceMap: false,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js' ],
  },
  plugins: [],
}
