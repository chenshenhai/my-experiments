import { parse } from './html2ast.js';
import ast2react from './ast2react.js';
import ast2vue from './ast2vue.js';

const html = `
<div class="box-1">
  <div class="box-2" >
    Hello
    <span class="box-3" >
      001
    </span>
    <span class="box-4" >
      002
    </span>
  </div>
  <div class="box-5" >Hello World</div>
</div>
`;
const ast = parse(html);

renderReact(ast);
function renderReact(ast) {
  // console.log(ast);
  const code = ast2react(ast);
  // console.log(code);
  eval(`
  ${code}
  ReactDOM.render(
    React.createElement(App, {}),
    document.querySelector('#root-react')
  )
  `);
}


renderVue(ast);
function renderVue(ast) {
  // console.log(ast);
  const code = ast2vue(ast);
  // console.log(code);
  eval(`
  ${code};
  const modue = Vue.defineComponent({
    render() {
      return Vue.h(App, {}, null)
    }
  });
  const app = Vue.createApp(modue);
  app.mount(document.querySelector('#root-vue'))
  `);
}
