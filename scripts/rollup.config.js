const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const vue = require('rollup-plugin-vue');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const externalGlobals = require('rollup-plugin-external-globals');
const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace')

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const babelOptions = {
  "presets": [
    '@babel/preset-env',
  ]
}

module.exports = [
  {
    input: resolveFile('src/index.js'),
    output: {
      name: 'HelloWorld',
      file: resolveFile('dist/index.iife.js'),
      format: 'iife',
    }, 
    plugins: [
      vue(),
      postcss({
        plugins: []
      }),
      nodeResolve(),
      commonjs(),
      babel(babelOptions),
      externalGlobals({
        'vue': 'Vue'
      }),
    ],
    external: ['vue'],
  },
  {
    input: resolveFile('src/index.js'),
    output: {
      file: resolveFile('dist/index.es.js'),
      format: 'es',
    }, 
    plugins: [
      vue(),
      postcss({
        plugins: []
      }),
      nodeResolve(),
      commonjs(),
      babel(babelOptions),
    ],
    external: ['vue'],
  },
  {
    input: resolveFile('src/vue.js'),
    output: {
      file: resolveFile('dist/vue.es.js'),
      format: 'es',
    }, 
    plugins: [
      nodeResolve(),
      commonjs(),
      babel(babelOptions),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'production' ),
        preventAssignment: true,
      }),
    ],
  },
  {
    input: resolveFile('src/index.js'),
    output: {
      file: resolveFile('dist/index.cjs.js'),
      format: 'cjs',
      exports: 'default'
    }, 
    plugins: [
      vue(),
      postcss({
        plugins: [],
        extract: true,
        extract: resolveFile('dist/index.css'),
      }),
      nodeResolve(),
      commonjs(),
      babel(babelOptions),
    ],
    external: ['vue'],
  },
]