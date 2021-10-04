import {
  render,
  useState,
} from './lib/react.js';

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


render(
  <App />,
  document.querySelector('#app')
);