(function(){
  const { Vue, HelloWorld } = window;
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
})()