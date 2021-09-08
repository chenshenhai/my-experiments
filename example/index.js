import '@babel/polyfill';
import { createApp, version } from 'vue';
import App from './App.vue';
import mycomponent from './../components/index';

// eslint-disable-next-line no-console
console.log('Vue version: ', version);

const app = createApp(App);
app
  .use(mycomponent)
  .mount('#app');