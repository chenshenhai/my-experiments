module.exports =  {
  "env": {
    "test": {
      presets: [
        '@babel/preset-env',
      ],
      plugins: [
        ['@vue/babel-plugin-jsx', { mergeProps: false, enableObjectSlots: false }],
        "@babel/plugin-transform-runtime"
      ]
    }
  }
}