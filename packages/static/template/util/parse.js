import html2ast from './html2ast.js';

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
  // const dataKeys = Object.keys(props.data || {});
  // console.log('dataKeys =', dataKeys)
  let code = '';
  if (ast.type === 'root') {
    let children = ast.children.map((child) => {
      return parseAST(child, props);
    })
    code = children.join(', ')
  } else if (ast.type === 'element') {
    if (ast.attributes?.class) {
      ast.attributes.className = ast.attributes?.class;
      delete ast.attributes.class;
    }
    // console.log(parseDirectives(ast.directives));
    const directs = parseDirectives(ast.directives);
    let ifDirect = '';
    if (directs['xx:if']) {
      ifDirect = `(${directs['xx:if']}) && `
    } 

    function createCode() {
      return `${ifDirect}React.createElement(
        ${elementMap[ast.tag] || `"${ast.tag}"`},
        ${JSON.stringify(ast.attributes || {})},
        ${ast.children?.map((child) => {
          return parseAST(child, props)
        }).join(', ')}
      )`;
    }

    code = createCode()
    if (directs['xx:for']) {
      code = `${directs['xx:for']}.map((item, idx) => {
        return ${createCode({})};
      })`
    }
  } else if (ast.type === 'text') {
    code = `"${parseText(ast.text || '')}"`;
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
  console.log('props ==', props);

  const ast = html2ast(html);
  console.log('ast =', ast);

  let result = parseAST(ast, props);
  result = `${getStateCode(props)} return ${result}`;

  const Component = new Function('props', result);
  return {
    props,
    Component,
  }
}


