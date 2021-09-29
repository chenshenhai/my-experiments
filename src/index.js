import { 
  createElement,
  render,
  useState,
 } from './lib/react.js';

function Count() {
  const [count, setCount] = useState(0);
  
  const onClick = () => {
    setCount(count + 1);
  }

  return createElement('div', {}, 
    createElement('button', {
      onClick,
      className: 'btn'
    }, 'Add'),
    createElement('span', null, 'Num: '),
    createElement('span', null, count),
    
  )
}



function App(props) {
  return createElement(Count, null);
}

render(
  createElement(App, null, {}),
  document.querySelector('#app')
);