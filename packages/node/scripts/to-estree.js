// import { parse } from '../lib/html2ast.js';
// import { readHTML, writeDistFile } from './file.js';

// const html = readHTML('view.html');
// const ast = parse(html);
// writeDistFile('html/view.json', JSON.stringify(ast, null, 2))


import babelParser from '@babel/parser';
import { readJSX, writeDistFile } from './file.js';
// import { clearBabelAst } from './babel.js';

const js = readJSX('Module.js');


let ast = babelParser.parse(js, {
  sourceType: "module",
  plugins: [
    // "jsx",
  ],
});

// // clearBabelAst(ast)

writeDistFile('estree/Module.json', JSON.stringify(ast, null, 2))
// // console.log(ast)




