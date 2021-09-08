const mycomponent = require('./components');

const req = require.context('./components/', true, /^\.\/locale\/.+_.+\.tsx$/);

mycomponent.locales = {};

req.keys().forEach(mod => {
  const matches = mod.match(/\/([^/]+).tsx$/);
  mycomponent.locales[matches[1]] = req(mod).default;
});

module.exports = studio;
