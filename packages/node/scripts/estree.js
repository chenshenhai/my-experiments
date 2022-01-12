import babelParser from '@babel/parser';
import { readJSX, writeDistFile } from './file.js';

const js = readJSX('Module.js');

let ast = babelParser.parse(js, {
  sourceType: "module",
  plugins: [
    // "jsx",
  ],
});
writeDistFile('estree/Module.json', JSON.stringify(ast, null, 2))





