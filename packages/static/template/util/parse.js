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
    // console.log(parseDirectives(ast.directives));
    const directs = parseDirectives(ast.directives);
    let ifDirect = '';
    if (directs['@:if']) {
      ifDirect = `(${directs['@:if']}) && `
    } 

    function createCode(extendProps = {}) {
      const resultProps = {...(ast.attributes || {}), ...extendProps}
      let propsStr = JSON.stringify(resultProps);
      propsStr = propsStr.replace(/("{{|}}")/g, '');
      return `${ifDirect}React.createElement(
        ${elementMap[ast.name] || `"${ast.name}"`},
        ${propsStr},
        ${ast.children?.map((child) => {
          return parseAST(child, props)
        }).join(', ')}
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

function getPageObject(js) {
  const func = new Function(`
    const Page = (a) => a;
    return ${js};
  `)
  return func();
}

function getStateCode(props) {
  const propNames = Object.keys(props);
  let code = `
  const { ${propNames.join(',')} } = props;\r\n
  `;
  return code;
}

export function parseComponent(comp) {
  const { html, js, css } = comp;
  const page = getPageObject(js);

  const props = page.data;
  const ast = parse(html);

  let result = parseAST(ast[0], props);
  result = `${getStateCode(props)} return ${result}`;

  const Component = new Function('props', result);
  return {
    props,
    Component,
  }
}


