class MyPlugin {

  apply(compiler) {
    let assetsHandler = (assets, compilation) => {

      Object.entries(assets).forEach(([filename, source]) => {
        if (/\.js$/.test(filename)) {
          let outputContent = source.source();
          outputContent = clearConsole(outputContent);
          compilation.assets[filename] = {
            source: () => {
              return outputContent
            },
            size: () => {
              return Buffer.byteLength(outputContent, 'utf8')
            }
          }
        }
      })
    }

    compiler.hooks.compilation.tap('MyPlugin',
      compilation => {
        // Webpack 5
        if (compilation.hooks.processAssets) {
          compilation.hooks.processAssets.tap(
            { name: 'MyPlugin' },
            assets => assetsHandler(assets, compilation)
          );
        } else if (compilation.hooks.optimizeAssets) {
          // Webpack 4
          compilation.hooks.optimizeAssets.tap(
            'MyPlugin', 
            assets => assetsHandler(assets, compilation)
          );
        }
      })
  }
}

function clearConsole(code) {
  let replaceList = [
    { reg: /\.console\.(log)\(\)/g, replace: '' },
    { reg: /\.console\.(log)\(/g, replace: ';(' },
    { reg: /console\.(log)\(\)/g, replace: '' },
    { reg: /console\.(log)\(/g, replace: '(' },
  ]
  replaceList.forEach(item => {
    code = code.replace(item.reg, item.replace);
  })
  return code;
}

module.exports = MyPlugin;