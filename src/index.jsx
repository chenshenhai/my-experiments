import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component'
import './index.less';

const Box = loadable(() => import('./components/box'));

function App() {
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBox(true);
    }, 3000)
  }, []);

  return (
    <div className="app">
      {showBox === true && <Box />}
      <div>Hello World</div>
    </div>
  )
}

ReactDOM.render((
  <App />
), document.querySelector('#app'));