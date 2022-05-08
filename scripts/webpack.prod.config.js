const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index')
// const ENV = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 11',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@vue/babel-plugin-jsx', { mergeProps: false, enableObjectSlots: false }],
  ],
};

module.exports = {
  mode: 'production',
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
        test: /\.(vue)$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ['\\.vue$'],
              happyPackMode: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /pickr.*js/,
        options: babelConfig,
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]',
      //   },
      // },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.md'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'dist/[name].css',
    }),
    new VueLoaderPlugin(),
    // new WebpackBar(),
  ],
};