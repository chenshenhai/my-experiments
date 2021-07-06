const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const vue = require('rollup-plugin-vue');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const externalGlobals = require('rollup-plugin-external-globals');
const postcss = require('rollup-plugin-postcss');
const alias = require('@rollup/plugin-alias');
const typescript = require('rollup-plugin-typescript2');

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
    input: resolveFile('src/index.jsx'),
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
  // {
  //   input: resolveFile('src/index.tsx'),
  //   output: {
  //     name: 'HelloWorld',
  //     file: resolveFile('dist/index.es.js'),
  //     format: 'es',
  //   }, 
  //   plugins: [
      
  //     vue(),
  //     postcss({
  //       plugins: []
  //     }),
  //     nodeResolve(),
  //     commonjs(),
  //     // babel(babelOptions),
  //     typescript({
  //       compilerOptions: { declaration: true },
  //       exclude: ["tests/**/*.ts", "tests/**/*.tsx"]
  //     }),
  //     alias({
  //       entries: [
  //         { find: 'vue', replacement: 'https://dev.jspm.io/vue@3' },
  //       ]
  //     }),
  //   ],
  //   external: [
  //     'vue',
  //   ],
  // },
]