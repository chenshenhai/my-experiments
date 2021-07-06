(() => {
  const { React, ReactDOM, HelloWorld } = window;

  ReactDOM.render(
    React.createElement(HelloWorld, {}, null),
    document.querySelector('#app'),
  )
})()