// import { parse } from '../lib/html2ast.js';
// import { readHTML, writeDistFile } from './file.js';

// const html = readHTML('view.html');
// const ast = parse(html);
// writeDistFile('ast/view.json', JSON.stringify(ast, null, 2))


import generator from "@babel/generator";
import { readDistFile } from './file.js';

const generate = generator.default;

const data = readDistFile('jsx/Module.json');
const json = JSON.parse(data);
const { code } = generate(json, {},);
console.log(code)



