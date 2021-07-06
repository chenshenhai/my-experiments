(() => {
  const { Vue, HelloWorld } = window;

  const app = Vue.createApp({
    template: `
      <div>
        <hello-world></hello-world>
      </div>
    `
  });
  app.component('hello-world', HelloWorld);
  app.mount('#app')
})()