const fs = require('fs');
const isFunction = require('is-type-of').function;
const utils = require('../utils');
const FileLoader = require('./file_loader');

class EggLoader {

  constructor(options) {
    this.options = options;
    this.app = this.options.app;

  }

  loadFile(filepath, ...inject) {
    if (!fs.existsSync(filepath)) {
      return null;
    }
    const ret = utils.loadFile(filepath);
    // function(arg1, args, ...) {}
    if (inject.length === 0) inject = [ this.app ];
    return isFunction(ret) ? ret(...inject) : ret;
  }

  loadToApp(directory, property, opt) {
    const target = this.app[property] = {};
    opt = Object.assign({}, {
      directory,
      target,
      inject: this.app,
    }, opt);
 
    new FileLoader(opt).load();
  }
}

const loaders = [
  require('./mixin/controller'),
  require('./mixin/router'),
];
for (const loader of loaders) {
  Object.assign(EggLoader.prototype, loader);
}

module.exports = EggLoader;