import { parse } from './html2ast.js';

function parseDirectives(directives = {}) {
  const result = {};
  Object.keys(directives).forEach((name) => {
    result[name] = `${directives[name] || ''}`.trim().replace(/^{{|}}$/g, '');
  });
  return result;
}

function parseText(text = '') {
  return text.replace(/{{/g, '" +').replace(/}}/g, '+ "')
}

const elementMap = {
  'view': '\"div\"',
  'text': '\"span\"',
}

function parseAST(ast, props = {}) {
  let code = '';
  if (ast.type === 'element') {
    if (ast.attributes?.class) {
      ast.attributes.className = ast.attributes?.class;
      delete ast.attributes.class;
    }
    const directs = parseDirectives(ast.directives);
    let ifDirect = '';
    if (directs['@:if']) {
      ifDirect = `(${directs['@:if']}) && `
    } 

    function createCode(extendProps = {}) {
      const eventProps = {};
      Object.keys(ast.events).forEach((name) => {
        eventProps[name] = `{{this.${ast.events[name]}}}`
      })
      const resultProps = {
        ...(ast.attributes || {}),
        ...eventProps,
        ...extendProps
      }
      let propsStr = JSON.stringify(resultProps);
      propsStr = propsStr.replace(/("{{|}}")/g, '');
      return `${ifDirect}Vue.h(
        ${elementMap[ast.name] || `"${ast.name}"`},
        ${propsStr},
        [${ast.children?.map((child) => {
          return parseAST(child, props)
        }).join(', ')}]
      )`;
    }

    code = createCode()
    if (directs['@:for']) {
      code = `${directs['@:for']}.map((item, idx) => {
        return ${createCode({key: '{{idx}}'})};
      })`
    }
  } else if (ast.type === 'text') {
    code = `"${parseText(ast.content || '')}"`;
  }
  return code;
}

function getPageOptions(js) {
  const func = new Function(`
    const Page = (a) => a;
    return ${js};
  `)
  return func();
}

export function parseToVue(comp) {
  const { html, js, css } = comp;
  const opts = getPageOptions(js);

  const props = opts.data;
  const ast = parse(html);

  let dom = parseAST(ast[0], props);
  const code = `
  function Page(opts) {
    return opts;
  }
  
  const opts = ${js};
  
  const vueOpts = {
    data() {
      const data = ${JSON.stringify(opts.data, null, 2)};
      data.data = this;
      return data;
    },
    methods: {
      setData(data) {
        Object.keys(data).forEach((name) => {
          this[name] = data[name];
        })
      },
    },
    render() {
      const { ${Object.keys(opts.data).join(',')} } = this;
      return ${dom}
    }
  }
  
  Object.keys(opts).forEach((name) => {
    if (typeof opts[name] === 'function') {
      vueOpts.methods[name] = opts[name];
    }
  });
  
  const App = Vue.defineComponent(vueOpts)

  return App;
  `;

  const genComponent = new Function('props', `${code}`);
  return {
    genComponent,
  }
}


