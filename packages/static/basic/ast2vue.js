// [
//   {
//       "type": "element",
//       "name": "div",
//       "unclosed": false,
//       "attributes": {
//           "class": "box-1"
//       },
//       "directives": {},
//       "events": {},
//       "children": [
//           {
//               "type": "element",
//               "name": "div",
//               "unclosed": false,
//               "attributes": {
//                   "class": "box-2"
//               },
//               "directives": {},
//               "events": {},
//               "children": [
//                   {
//                       "type": "text",
//                       "content": "Hello"
//                   },
//                   {
//                       "type": "element",
//                       "name": "span",
//                       "unclosed": false,
//                       "attributes": {
//                           "class": "box-3"
//                       },
//                       "directives": {},
//                       "events": {},
//                       "children": [
//                           {
//                               "type": "text",
//                               "content": "001"
//                           }
//                       ]
//                   },
//                   {
//                       "type": "element",
//                       "name": "span",
//                       "unclosed": false,
//                       "attributes": {
//                           "class": "box-4"
//                       },
//                       "directives": {},
//                       "events": {},
//                       "children": [
//                           {
//                               "type": "text",
//                               "content": "002"
//                           }
//                       ]
//                   }
//               ]
//           },
//           {
//               "type": "element",
//               "name": "div",
//               "unclosed": false,
//               "attributes": {
//                   "class": "box-5"
//               },
//               "directives": {},
//               "events": {},
//               "children": [
//                   {
//                       "type": "text",
//                       "content": "Hello World"
//                   }
//               ]
//           }
//       ]
//   }
// ]

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
      "${ast.name}",
      ${JSON.stringify(ast.attributes || {})},
      ${ast.children?.map((child) => {
        return parseAST(child)
      }).join(', ')}
    )
    `
  } else if (ast.type === 'text') {
    code = `"${ast.content || ''}"`;
  }
  return code;
}

function ast2vue(ast) {
  let code = `
  function App() {
    return Vue.h('div', {});
  }
  `;
  if (ast[0]) {
    code = parseAST(ast[0]);
    code = `
    function App() {
      return ${code}
    }
    `;
  }
  return code;
}

export default ast2vue;