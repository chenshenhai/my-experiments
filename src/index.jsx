import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component'
import './index.less';

const Box = loadable(() => import('./components/box'))

ReactDOM.render((
  <div className="app">
    <Box />
    <div>Hello World</div>
  </div>
), document.querySelector('#app'));