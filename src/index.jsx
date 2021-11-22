import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

function Component(props = {}) {
  const { text = 'React' } = props;

  console.log('Hello World! 001')
  console.log('Hello World! 002')
  console.log('Hello World! 003')

  return (
    <div className="box">
      Hello {text}!
    </div>
  )
}

ReactDOM.render(
  <Component />,
  document.querySelector('#app'),
)