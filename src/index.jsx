import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component'
import './index.less';

const Box = loadable(() => {
  const promise = import('./components/box');
  return promise;
});

const lazyLoad = (dymanicImport) => {
  return function LazyComponent() {
    const ref = useRef(null)
    useEffect(() => {
      dymanicImport().then((mod) => {
        let Module = null
        if (mod.__esModule === true && mod.default) {
          Module = mod.default;
        } else {
          Module = mod;
        }
        ReactDOM.render(React.createElement(
          Module, null, {}
        ), ref.current)
      }).catch(console.log);
    }, []);

    return (
      <div ref={ref}></div>
    );
  }
}




const Box2 = lazyLoad(() => import('./components/box2'));

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
      <Box2 />
    </div>
  )
}

ReactDOM.render((
  <App />
), document.querySelector('#app'));