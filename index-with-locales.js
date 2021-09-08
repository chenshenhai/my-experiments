const mycomponent = require('./components');
const req = require.context('./components', true, /^\.\/locale-provider\/(?!__tests__).+_.+\.ts$/);

mycomponent.locales = {};

req.keys().forEach(mod => {
  const match = mod.match(/\/([^/]+).js$/);
  mycomponent.locales[match[1]] = req(mod).default;
});

module.exports = mycomponent;
