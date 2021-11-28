import { compile } from './compile.js'; 

class Template {
  constructor() {
    this._tplFunc = () => {};
  }

  load(tpl) {
    const func = compile(tpl);
    this._tplFunc = func;
  }

  render(root, data) {
    root.innerHTML = this._tplFunc(data);
  }
}


export default Template;