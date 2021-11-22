const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const externalGlobals = require('rollup-plugin-external-globals');
const postcss = require('rollup-plugin-postcss');
const serve = require('rollup-plugin-serve');
const myPlugin = require('./plugin');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const babelOptions = {
  "presets": [
    '@babel/preset-env',
    '@babel/preset-react'
  ]
}

module.exports = [
  {
    input: resolveFile('src/index.jsx'),
    output: {
      name: 'HelloWorld',
      file: resolveFile('dist/index.js'),
      format: 'iife',
    }, 
    plugins: [
      postcss({
        plugins: []
      }),
      nodeResolve(),
      commonjs(),
      babel(babelOptions),
      externalGlobals({
        'react': 'React',
        'react-dom': 'ReactDOM',
      }),

      myPlugin(),
      serve({
        open: true,
        openPage: '/examples/index.html',
        port: 3001,
        contentBase: path.join(__dirname, '..'),
      }),
    ],
    external: ['react', 'react-dom'],
  }
]