
requirejs.config({
  baseUrl: '/', 
  paths: {
    'HelloWorld': '../../dist/index.amd',
  }
});
define('vue', [], () => { return window.Vue; });

require(['vue', 'HelloWorld'], (Vue, HelloWorld) => {
  const { createApp, defineComponent, h } = Vue;
  const root = defineComponent({
    render() {
      return h('div', {}, [
        h(HelloWorld, { text: 'MyVue' }, null)
      ])
    }
  });
  
  const app = createApp(root);
  app.component('hello-world', HelloWorld);
  app.mount('#app')
});
