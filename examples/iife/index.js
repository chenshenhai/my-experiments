(() => {
  const { React, ReactDOM, HelloWorld } = window;

  ReactDOM.render(
    React.createElement(HelloWorld, { text: 'MyReact' }, null),
    document.querySelector('#app'),
  )
})()