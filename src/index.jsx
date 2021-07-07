import React from 'react';
import './index.css';

export default function Component(props = {}) {
  const { text = 'React' } = props;
  return (
    <div className="box">
      Hello {text}!
    </div>
  )
}