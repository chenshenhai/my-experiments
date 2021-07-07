
import { createApp, defineComponent, h } from './../../dist/vue.es.js';
import HelloWorld from './../../dist/index.es.js';


const root = defineComponent({
  render() {
    return h('div', {}, [
      h(HelloWorld, {}, null)
    ])
  }
});

const app = createApp(root);
app.component('hello-world', HelloWorld);
app.mount('#app')