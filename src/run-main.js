import React from 'react';
import ReactDOM from 'react-dom';

const { createElement, useState, } = React;

function Count(props) {
  const [count, setCount] = useState(0);
  
  const onClick = () => {
    setCount(count + 1);
  }

  return createElement('div', props, 
    createElement('button', {
      onClick,
      className: 'btn',
      id: 'dom-btn'
    }, 'Add'),
    createElement('span', { id: 'dom-span-text' }, 'Num: '),
    createElement('span', { id: 'dom-span-num' }, count),
  )
}


function App(props) {
  return createElement(Count, { id: 'dom-app' });
}

ReactDOM.render(
  createElement(App, null, {}),
  document.querySelector('#app')
);