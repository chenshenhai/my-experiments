import React from 'react';

function Hello(props: any) {
  return (
    <div>
      <div>Hello</div>
      <div>{props.children}</div>
    </div>
  )
}

export default Hello;