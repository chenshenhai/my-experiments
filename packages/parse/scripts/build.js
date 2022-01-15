import generator from "@babel/generator";
import { parse } from '../lib/html2ast.js';
import { readHTML, writeDistFile } from './file.js';
import { toReactAst } from '../lib/to-react.js';


const generate = generator.default;

async function parseComponent(name) {
  let cacheConfig = {};
  global.ModuleConfig = (a) => {
    cacheConfig = a;
  }
  (await import(`../src/html/${name}.js`));
  const html = readHTML(`${name}.html`);
  const js = readHTML(`${name}.js`);
  
  const htmlAst = parse(html);
  writeDistFile(`html/${name}.json`, JSON.stringify(htmlAst, null, 2));

  const reactAst = toReactAst(html, js, cacheConfig.data);
  writeDistFile(`react/${name}.json`, JSON.stringify(reactAst, null, 2));

  const { code } = generate(reactAst, {},);
  writeDistFile(`react/${name}.js`, code);
}

async function start() {
  await parseComponent('view')
  await parseComponent('hello')
  await parseComponent('count')
}

start();










