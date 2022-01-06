import generator from "@babel/generator";
import { parse } from '../lib/html2ast.js';
import { readHTML, writeDistFile } from './file.js';
import { toReactAst } from './../lib/to-react.js';

const generate = generator.default;

const html = readHTML('view.html');
const htmlAst = parse(html);
writeDistFile('html/view.json', JSON.stringify(htmlAst, null, 2));

const reactAst = toReactAst(htmlAst, { 
  data: {
    name: 'Apple',
    list: [
      '001', '002', '003', '004'
    ],
    bindtap: () => {
      console.log('Hello World')
    },
  }
});
writeDistFile('react/view.json', JSON.stringify(reactAst, null, 2));

const { code } = generate(reactAst, {},);
writeDistFile('react/view.js', code);









