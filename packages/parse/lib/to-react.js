function createProgram(body = []) {
  return {
    "type": "File",
    "program": {
      "type": "Program",
      "sourceType": "script",
      "interpreter": null,
      "body": body,
      "directives": []
    },
    "comments": []
  }
}

function createFunction(name, body = []) {
  return {
    "type": "FunctionDeclaration",
    "id": {
      "type": "Identifier",
      "name": name
    },
    "generator": false,
    "async": false,
    "params": [
      {
        "type": "Identifier",
        "name": "props"
      }
    ],
    "body": {
      "type": "BlockStatement",
      "body": body,
      "directives": []
    }
  }
}

function createStateVar(vars) {
  return  {
    "type": "VariableDeclaration",
    "declarations": [
      {
        "type": "VariableDeclarator",
        "id": {
          "type": "ObjectPattern",
          "properties": vars.map((name) => {
            return {
              "type": "ObjectProperty",
              "key": {
                "type": "Identifier",
                "name": name
              },
              "computed": false,
              "method": false,
              "shorthand": true,
              "value": {
                "type": "Identifier",
                "name": name
              }
            }
          })
        },
        "init": {
          "type": "MemberExpression",
          "object": {
            "type": "ThisExpression"
          },
          "computed": false,
          "property": {
            "type": "Identifier",
            "name": "state"
          }
        }
      }
    ],
    "kind": "const"
  };
}

function createReturn(htmlAst) {
  return {
    "type": "ReturnStatement",
    "argument": createElement(htmlAst[0])
  }
}

function createNull() {
  return {
    "type": "NullLiteral",
  }
}

function createConditionElement(consequentAst, alternateAst) {
  const condition = consequentAst.directives['@:if'].replace(/({{|}})/g, '').trim();
  let consequent = createElement(consequentAst);
  let alternate = createNull();
  if (alternateAst) {
    alternate = createElement(alternateAst)
  }
  const result = {
    "type": "ConditionalExpression",
    "test": {
      "type": "Identifier",
      "name": condition,
    },
    consequent,
    alternate,
  }
  return result
}

function createVar(name) {
  return {
    "type": "Identifier",
    "name": name
  }
}

function createStr(str) {
  return {
    "type": "StringLiteral",
    "value": str
  }
}

function createIdentifier(str) {
  return {
    "type": "Identifier",
    "name": str.replace(/({{|}})/g, ''),
  }
}

function createListElement(htmlAst, listKey, indexKey, itemKey) {
  htmlAst.attributes['key'] = `{{${indexKey}}}`;
  const result = {
    "type": "CallExpression",
    "callee": {
      "type": "MemberExpression",
      "object": {
        "type": "Identifier",
        "name": listKey
      },
      "computed": false,
      "property": {
        "type": "Identifier",
        "name": "map"
      }
    },
    "arguments": [
      {
        "type": "ArrowFunctionExpression",
        "id": null,
        "generator": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "name": itemKey
          },
          {
            "type": "Identifier",
            "name": indexKey
          }
        ],
        "body": {
          "type": "BlockStatement",
          "body": [
            {
              "type": "ReturnStatement",
              "argument": createElement(htmlAst)
            }
          ],
          "directives": []
        }
      }
    ]
  }
  return result;
}

function createTextList(htmlAst) {
  const content = htmlAst.content.trim();
  let indexList = [];
  content.replace(/{{\s*[a-zA-Z0-9\_]{2,}\s*}}/g, (match, index) => {
    if (indexList.length === 0 && index > 0) {
      indexList.push({
        type: 'str',
        start: 0,
        end: index,
      })
    } else if (indexList.length > 0 && indexList[indexList.length - 1].end <= index) {
      indexList.push({
        type: 'str',
        start: indexList[indexList.length - 1].end,
        end: index,
      })
    }
    indexList.push({
      type: 'var',
      start: index,
      end: index + match.length,
    })
  });

  if (indexList.length > 0 && indexList[indexList.length - 1].end < content.length) {
    indexList.push({
      type: 'str',
      start: indexList[indexList.length - 1].end,
      end: content.length,
    })
  } else if (indexList.length === 0 && content.length > 0) {
    indexList.push({
      type: 'str',
      start: 0,
      end: content.length,
    })
  }
  const result = [];
  indexList.forEach((item) => {
    if (item.type === 'var') {
      const varname = content.substring(item.start, item.end).replace(/({{|}})/g, '').trim();
      result.push(createVar(varname))
    } else {
      result.push(createStr(content.substring(item.start, item.end)))
    }
  })
  // TODO
  // console.log('result =', result)
  return result;
}

function createElement(htmlAst) {
  const _events = {};
  Object.keys(htmlAst.events).forEach((name) => {
    _events[name] = `{{this.${htmlAst.events[name]}}}`
  });
  const obj = {
    ...htmlAst.attributes,
    ..._events,
  }
  const result = {
    "type": "CallExpression",
    "callee": {
      "type": "MemberExpression",
      "object": {
        "type": "Identifier",
        "name": "React"
      },
      "computed": false,
      "property": {
        "type": "Identifier",
        "name": "createElement"
      }
    },
    "arguments": [
      {
        "type": "StringLiteral",
        "value": htmlAst.name
      },
      createObject(obj),
    ]
  }
  if (Array.isArray(htmlAst.children)) {
    let i = 0;
    while (i < htmlAst.children.length) {
      const child = htmlAst.children[i];
      if (child.type === 'element') {
        if (child.directives['@:if']) {
          let otherChild = null;
          if (i < htmlAst.children.length - 1) {
            const nextChild = htmlAst.children[i + 1];
            if (nextChild.type === 'element' && nextChild.directives.hasOwnProperty('@:else')) {
              i++;
              otherChild = htmlAst.children[i];
            }
            result.arguments.push(createConditionElement(child, otherChild))
            i++;
            continue;
          }
        }

        if (child.directives['@:for']) {
          const listKey = child.directives['@:for'].replace(/({{|}})/g, '').trim();
          const indexKey = child.directives['@:for-index'].replace(/({{|}})/g, '').trim() || 'index';
          const itemKey = child.directives['@:for-item'].replace(/({{|}})/g, '').trim() || 'item';
          result.arguments.push(createListElement(child, listKey, indexKey, itemKey))
          i++;
          continue;
        } 
        result.arguments.push(createElement(child));
      } else if (child.type === 'text') {
        result.arguments = result.arguments.concat(createTextList(child));
      }
      i++;
    }  
  }
  return result;
}

function createObject(obj) {
  const names = Object.keys(obj);
  return {
    "type": "ObjectExpression",
    "properties": names.map((name) => {
      return {
        "type": "ObjectProperty",
        "method": false,
        "key": {
          "type": "Identifier",
          "name": name
        },
        "computed": false,
        "shorthand": false,
        "value": createValue(obj[name])
      }
    })
  }
}

function createExportDefault(name) {
  return {
    "type": "ExportDefaultDeclaration",
    "declaration": {
      "type": "Identifier",
      "name": name
    }
  }
}

function createComponentClass(name, body) {
  return {
    "type": "ClassDeclaration",
    "id": {
      "type": "Identifier",
      "name": name
    },
    "superClass": {
      "type": "MemberExpression",
      "object": {
        "type": "Identifier",
        "name": "React"
      },
      "computed": false,
      "property": {
        "type": "Identifier",
        "name": "Component"
      }
    },
    "body": {
      "type": "ClassBody",
      "body": body
    }
  }
}

function createClassMethod(type, name, body = []) {
  return  {
    "type": "ClassMethod",
    "static": false,
    "key": {
      "type": "Identifier",
      "name": name
    },
    "computed": false,
    "kind": type, // "method" | "constructor",
    "id": null,
    "generator": false,
    "async": false,
    "params": [],
    "body": {
      "type": "BlockStatement",
      "body": body,
      "directives": []
    }
  }
}

function createSuper() {
  return {
    "type": "ExpressionStatement",
    "expression": {
      "type": "CallExpression",
      "callee": {
        "type": "Super"
      },
      "arguments": []
    }
  }
}

function createValue(val) {
  if (typeof val === 'string') {
    const _val = val.trim();
    if (_val.startsWith('{{') && _val.endsWith('}}')) {
      return createIdentifier(val)
    } else {
      return createStr(val) 
    }
  } else {
    return createNull();
  }
}

function createDefineState(data) {
  return  {
    "type": "ExpressionStatement",
    "expression": {
      "type": "AssignmentExpression",
      "operator": "=",
      "left": {
        "type": "MemberExpression",
        "object": {
          "type": "ThisExpression"
        },
        "computed": false,
        "property": {
          "type": "Identifier",
          "name": "state"
        }
      },
      "right": {
        "type": "ObjectExpression",
        "properties": Object.keys(data).map((name) => {
          return {
            "type": "ObjectProperty",
            "method": false,
            "key": {
              "type": "Identifier",
              "name": name
            },
            "computed": false,
            "shorthand": false,
            "value": createValue(data[name])
          }
        })
      }
    }
  }
}

function createClassMethodSetData() {
  return  {
    "type": "ClassMethod",
    "static": false,
    "key": {
      "type": "Identifier",
      "name": "setData"
    },
    "computed": false,
    "kind": "method",
    "id": null,
    "generator": false,
    "async": false,
    "params": [
      {
        "type": "Identifier",
        "name": "data"
      }
    ],
    "body": {
      "type": "BlockStatement",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "CallExpression",
            "callee": {
              "type": "MemberExpression",
              "object": {
                "type": "ThisExpression"
              },
              "computed": false,
              "property": {
                "type": "Identifier",
                "name": "setState"
              }
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "data"
              }
            ]
          }
        }
      ],
      "directives": []
    }
  }
}

function toReactAst(htmlAst, page) {
  const propKeys = Object.keys(page.data || {});
  const name = 'App'
  const target = createProgram([
    createComponentClass(name, [
      createClassMethod('constructor', 'constructor', [
        createSuper(),
        createDefineState(page.data)
      ]),
      createClassMethodSetData(),
      createClassMethod('method', 'render', [
        createStateVar(propKeys),
        createReturn(htmlAst),
      ]),
    ]),
    createExportDefault(name)
  ]);
  return target;
}

export {
  toReactAst,
}