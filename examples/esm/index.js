
import Vue from 'vue';
import HelloWorld from './../../dist/index.es.js';

const app = Vue.createApp({
  template: `
    <div>
      <hello-world></hello-world>
    </div>
  `
});
app.component('hello-world', HelloWorld);
app.mount('#app')