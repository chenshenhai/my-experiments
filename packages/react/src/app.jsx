import React from 'react';

const { useState, useCallback } = React;

const App = (props) => {
  const { beginNum = 0 } = props;
  const [count, setCount] = useState(beginNum);
  const onClick = useCallback(() => {
    setCount(count + 1)
  }, [count])
  return (
    <div>
      <div>count:{count}</div>
      <button onClick={onClick}>Add</button>
    </div>
  )
}


export default App;