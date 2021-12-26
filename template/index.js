import { getComponent } from './get.js';

start();

async function start() {
  const hello = await getComponent('hello');
  console.log('hello =', hello);
}

