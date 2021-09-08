const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production' &&
  ENV !== 'test' &&
  typeof console !== 'undefined' &&
  console.warn &&
  typeof window !== 'undefined'
) {
  console.warn(
      'Please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size. Not support Vite !!!',
  );
}
/* @remove-on-es-build-end */
import { App } from 'vue';
import Btn1 from './btn1';
import Btn2 from './btn2';

const version = '0.0.1';

const components: any[] = [
  Btn1, Btn2,
];

const install = function(app: App) {
  components.forEach(component => {
    app.use(component);
  });
  // TODO
  return app;
};

/* istanbul ignore if */

export {
  version,
  Btn1, Btn2,
};

export default {
  version,
  install,
};
