import { getComponent } from './util/get.js';
import { parseToReact } from './util/parse2react.js';
import { parseToVue } from './util/parse2vue.js';

start();

async function start() {
  // const data = await getComponent('box');
  const data = await getComponent('hello');
  // const data = await getComponent('count');
  startReact(data);
  startVue(data);
}

async function startReact(data) {
  const { genComponent } = parseToReact(data);
  const App = genComponent();
  ReactDOM.render(
    React.createElement(App, {}, null),
    document.querySelector('#react-root')
  )
}

async function startVue(data) {
  const { genComponent } = parseToVue(data);
  const App = genComponent();
  const comp = Vue.defineComponent({
    render() {
      return Vue.h(App, {}, null)
    }
  });
  const app = Vue.createApp(comp);
  app.mount('#vue-root')
}

