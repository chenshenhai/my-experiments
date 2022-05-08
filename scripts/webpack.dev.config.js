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
    'index' : fileResolve('src/index.ts'),
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
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
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
          MiniCssExtractPlugin.loader,
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

  devServer: {
    contentBase: path.join(__dirname, '..'),
    port: 9000,
    hot: false,
    inline: false,
  }
}