import { getComponent } from './util/get.js';
import { parseComponent } from './util/parse.js';

start();

async function start() {
  const hello = await getComponent('hello');
  const { props, Component } = parseComponent(hello);

  console.log('hello =', props, Component);
  ReactDOM.render(
    React.createElement(Component, props, null),
    document.querySelector('#root')
  )
}

