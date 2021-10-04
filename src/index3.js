import { transform } from './lib/transform.js';
import { parseJSX } from './lib/jsx.js';

async function main() {
  const jsx = await fetch('./src/index.jsx').then(res => res.text());
  const js = transform(jsx);
  console.log('js====', js);

  // console.log(parseJSX(' <a>123</a>'))
  // console.log(parseJSX(' 123'))
}



main();
