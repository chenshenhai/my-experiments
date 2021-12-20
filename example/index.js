import parse from './lib.js';

const html = `
<div class="box-1">
  <img src="xxxxx/xxxx/xxx/x.jpg" />
  <div class="box-2" >
    Hello 002
    <span  class="box-3" >
      Hello 003
    </span>
  </div>
</div>
`;
const ast = parse(html);
console.log(ast);