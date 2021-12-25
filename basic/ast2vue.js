// {
//   "type": "root",
//   "children": [
//       {
//           "type": "element",
//           "tag": "div",
//           "attributes": {
//               "class": "box-1"
//           },
//           "children": [
//               {
//                   "type": "element",
//                   "tag": "img",
//                   "attributes": {
//                       "src": "xxxxx/xxxx/xxx/x.jpg"
//                   }
//               },
//               {
//                   "type": "element",
//                   "tag": "div",
//                   "attributes": {
//                       "class": "box-2"
//                   },
//                   "children": [
//                       {
//                           "type": "text",
//                           "text": "Hello 002"
//                       },
//                       {
//                           "type": "element",
//                           "tag": "span",
//                           "attributes": {
//                               "class": "box-3"
//                           },
//                           "children": [
//                               {
//                                   "type": "text",
//                                   "text": "Hello 003"
//                               }
//                           ]
//                       }
//                   ]
//               }
//           ]
//       }
//   ]
// }


function parseAST(ast) {
  let code = '';
  if (ast.type === 'root') {
    let children = ast.children.map((child) => {
      return parseAST(child);
    })
    code = children.join(', ')
  } else if (ast.type === 'element') {
    if (ast.attributes?.class) {
      ast.attributes.className = ast.attributes?.class;
      delete ast.attributes.class;
    }
    code = `Vue.h(
      "${ast.tag}",
      ${JSON.stringify(ast.attributes || {})},
      ${ast.children?.map((child) => {
        return parseAST(child)
      }).join(', ')}
    )
    `
  } else if (ast.type === 'text') {
    code = `"${ast.text || ''}"`;
  }
  return code;
}

function ast2vue(ast) {
  let code = `
  function App() {
    return Vue.h('div', {});
  }
  `;
  if (ast) {
    code = parseAST(ast);
    code = `
    function App() {
      return ${code}
    }
    `;
  }
  return code;
}

export default ast2vue;