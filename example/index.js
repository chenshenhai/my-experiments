import parse from './lib.js';
import ast2react from './ast2react.js';

const html = `
<div class="box-1">
  <div class="box-2" >
    Hello 002
    <span class="box-3" >
      Hello 003
    </span>
  </div>
</div>
`;
const ast = parse(html);
console.log(ast);

const code = ast2react(ast);
console.log(code);
eval(`
${code}
ReactDOM.render(
  React.createElement(App, {}),
  document.querySelector('#app')
)
`);