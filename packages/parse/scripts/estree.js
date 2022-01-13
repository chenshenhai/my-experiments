import babelParser from '@babel/parser';
import { readJSX, writeDistFile } from './file.js';

const js = readJSX('Module.js');

let ast = babelParser.parse(js, {
  sourceType: "module",
  plugins: [
    // "jsx",
  ],
});

function clearAst(ast) {
  Object.keys(ast).forEach((name) => {
    if (['start', 'end', 'loc', 'extra'].includes(name)) {
      delete ast[name];
    } else if (Array.isArray(ast[name])) {
      ast[name].forEach((item) => {
        clearAst(item);
      })
    } else if (Object.prototype.toString.call(ast[name]) === '[object Object]') {
      clearAst(ast[name]);
    }
  })
}

clearAst(ast)

writeDistFile('estree/Module.json', JSON.stringify(ast, null, 2))





