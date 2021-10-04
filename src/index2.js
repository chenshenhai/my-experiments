import {
  render,
  useState,
  createElement,
} from './lib/react.js';

function App(props) {
  return (createElement(
    Count,
          null
          
      ));
}

function Count(props) {
  const [count, setCount] = useState(0);
  
  const onClick = () => {
    setCount(count + 1);
  }
  return (createElement(
          'div',
          null,
          createElement(
          'button',
          {className: "btn",onClick: onClick},
          "Add"
      ),createElement(
          'span',
          null,
          "Num:"
      ),createElement(
          'span',
          null,
          "",count
      )
      ))
}


render(
  createElement(
          App,
          null
          
      ),
  document.querySelector('#app')
);