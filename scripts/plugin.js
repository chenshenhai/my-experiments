const extname = require("path").extname;
const { createFilter } = require('@rollup/pluginutils');
const MagicString = require('magic-string');

// function clearConsole(code) {
//   let replaceList = [
//     { reg: /\.console\.(log)\(\)/g, replace: '' },
//     { reg: /\.console\.(log)\(/g, replace: ';(' },
//     { reg: /console\.(log)\(\)/g, replace: '' },
//     { reg: /console\.(log)\(/g, replace: '(' },
//   ]
//   replaceList.forEach(item => {
//     code = code.replace(item.reg, item.replace);
//   })
//   return code;
// }


function MyPlugin (options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const sourcemap = options.sourcemap === true;

	return {
		name: 'my-plugin',

		transform (code, id) {
      if (!filter(id) || extname(id) !== ".js") return;

      let codeStr = `${code}`;
      const magic = new MagicString(codeStr);
      if (sourcemap === true) {
        codeStr = codeStr.replace(/hello\sworld/ig, function(match, offset) {
          const start = offset;
          const end = offset + match.length;
          magic.overwrite(start, end, newStr);
          return newStr;
        });
      }
      
      const resultCode = magic.toString();
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