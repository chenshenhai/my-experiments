import { parseJSX, transform } from './lib/jsx.js';

async function main() {
  const jsx = await fetch('./src/index.jsx').then(res => res.text());
  const ast = parseJSX(jsx);
  const js = transform(ast);
  console.log('js====', js);
}

main();
