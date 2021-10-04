import React from 'react';
import ReactDOM from 'react-dom';

const { useState, } = React;

function App(props) {
  return (<Count />);
}

function Count(props) {
  const [count, setCount] = useState(0);
  
  const onClick = () => {
    setCount(count + 1);
  }
  return (<div>
      <button className="btn" onClick={onClick}>Add</button>
      <span>Num: </span>
      <span>{count}</span>
    </div>)
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);