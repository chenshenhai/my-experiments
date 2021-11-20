import * as React from 'react';
import ReactDOM from 'react-dom';
import { Counter } from './components/count';
import './index.less';

ReactDOM.render((
  <div className="app">
   Hello World 88888
   <Counter />
  </div>
), document.querySelector('#app'));

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
 

// // import ReactDOM from 'react-dom';
// import { app } from './app';

// app();

// // // @ts-ignore
// // if (module.hot) {
// //   // @ts-ignore
// //   module.hot.accept([
// //     './app.tsx',
// //     './components/count.tsx'
// //   ], function() {
// //     console.log('start to replace .........');
// //     // @ts-ignore
// //     ReactDOM.unmountComponentAtNode(document.querySelector('#app'))
// //     app()
// //   })
// // }

// // @ts-ignore
// if (module.hot) {
//   // @ts-ignore
//   module.hot.accept();
// }