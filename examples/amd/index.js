

(function(){

  const { requirejs, define, React, ReactDOM } = window;
  requirejs.config({
    baseUrl: '/', 
    paths: {
      'HelloWorld': '../../dist/index.amd',
    }
  });
  define('react', [], () => { return React; });
  define('react-dom', [], () => { return ReactDOM; });
  
  require(['react', 'react-dom', 'HelloWorld'], (React, ReactDOM, HelloWorld) => {
    ReactDOM.render(
      React.createElement(HelloWorld, { text: 'MyReact' }, null),
      document.querySelector('#app'),
    )
  })
  
})()