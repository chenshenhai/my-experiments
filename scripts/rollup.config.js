const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const externalGlobals = require('rollup-plugin-external-globals');
const postcss = require('rollup-plugin-postcss');

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
      file: resolveFile('dist/index.iife.js'),
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
      })
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: resolveFile('src/index.jsx'),
    output: {
      name: 'HelloWorld',
      file: resolveFile('dist/index.es.js'),
      format: 'es',
    }, 
    plugins: [
      postcss({
        plugins: []
      }),
      nodeResolve(),
      commonjs(),
      babel(babelOptions),
    ],
    external: [
      'react-dom',
      'react',
    ],
  },
  {
    input: resolveFile('src/index.jsx'),
    output: {
      name: 'HelloWorld',
      file: resolveFile('dist/index.amd.js'),
      format: 'amd',
    }, 
    plugins: [
      postcss({
        plugins: []
      }),
      nodeResolve(),
      commonjs(),
      babel(babelOptions),
    ],
    external: [
      'react-dom',
      'react',
    ],
  },
]