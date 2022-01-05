// import { parse } from '../lib/html2ast.js';
// import { readHTML, writeDistFile } from './file.js';

// const html = readHTML('view.html');
// const ast = parse(html);
// writeDistFile('ast/view.json', JSON.stringify(ast, null, 2))


import babelParser from '@babel/parser';
import { readJSX, writeDistFile } from './file.js';

const jsx = readJSX('Module.jsx');
const ast = babelParser.parse(jsx, {
  plugins: [
    "jsx",
  ],
})
writeDistFile('jsx/Module.json', JSON.stringify(ast, null, 2))
console.log(ast)



