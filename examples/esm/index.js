import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './../../dist/index.es.js';

ReactDOM.render(
  React.createElement(HelloWorld, {}, null),
  document.querySelector('#app'),
)