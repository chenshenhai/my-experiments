import { parse } from '../lib/html2ast.js';
import { readHTML, writeDistFile } from './file.js';

const html = readHTML('view.html');
const ast = parse(html);
writeDistFile('ast/view.json', JSON.stringify(ast, null, 2))