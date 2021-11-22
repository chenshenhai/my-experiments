const extname = require("path").extname;
const { createFilter } = require('@rollup/pluginutils');
const MagicString = require('magic-string');


function MyPlugin (options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const sourcemap = options.sourcemap === true;

	return {
		name: 'my-plugin',

		transform (code, id) {
      if (['.jsx', '.js'].includes(extname(id)) !== true) {
        return;
      }

      let codeStr = `${code}`;
      const magic = new MagicString(codeStr);

      codeStr = codeStr.replace(/[\.]{0,1}console\.(log)\(/ig, function(match, offset) {
        const newStr = ';(';
        const end = offset + newStr.length;
        if (sourcemap === true) {
          const start = offset;
          magic.overwrite(start, end, newStr);
        }
        return newStr;
      });

      const resultCode = codeStr; // magic.toString();
      let resultMap = false;
      if (sourcemap === true) {
        resultMap = magic.generateMap({
          hires: true,
        });
      }

			return {
				code: resultCode,
				map: resultMap,
      };
    }
    
	};
}

module.exports = MyPlugin