const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const externalGlobals = require('rollup-plugin-external-globals');
const alias = require('@rollup/plugin-alias');

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
      nodeResolve(),
      commonjs(),
      babel(babelOptions),
      alias({
        entries: [
          { find: 'react', replacement: 'https://dev.jspm.io/react' },
          { find: 'react-dom', replacement: 'https://dev.jspm.io/react-dom' }
        ]
      }),
    ],
    external: [
      // 'https://dev.jspm.io/react',
      // 'https://dev.jspm.io/react-dom',
      'react-dom',
      'react',
    ],
  },
]