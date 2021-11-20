import * as React from 'react';
import ReactDOM from 'react-dom';
import { Counter } from './components/count';
import './index.less';

export function app() {
  ReactDOM.render((
    <div className="app">
     Hello World 1111
     <Counter />
    </div>
  ), document.querySelector('#app'));
}

 