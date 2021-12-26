import { getComponent } from './util/get.js';
import { parseComponent } from './util/parse.js';

start();

async function start() {
  const hello = await getComponent('hello');
  console.log('hello =', hello);
  const comp = parseComponent(hello)
}

