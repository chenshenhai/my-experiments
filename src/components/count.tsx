import React from 'react';

const { useState } = React;

export function Counter() {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1);
      }}>Add</button>
      <span>{count}</span>
    </div>
  )
}