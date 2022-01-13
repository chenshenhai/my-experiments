import generator from "@babel/generator";
import { parse } from '../lib/html2ast.js';
import { readHTML, writeDistFile } from './file.js';
import { toReactAst } from '../lib/to-react.js';


const generate = generator.default;

async function parseComponent(name) {
  const pageScript = (await import(`../src/html/${name}.js`)).default;
  const html = readHTML(`${name}.html`);
  const htmlAst = parse(html);
  writeDistFile(`html/${name}.json`, JSON.stringify(htmlAst, null, 2));

  const reactAst = toReactAst(htmlAst, pageScript);
  writeDistFile(`react/${name}.json`, JSON.stringify(reactAst, null, 2));

  const { code } = generate(reactAst, {},);
  writeDistFile(`react/${name}.js`, code);
}

async function start() {
  await parseComponent('view')
  await parseComponent('hello')
}

start();










