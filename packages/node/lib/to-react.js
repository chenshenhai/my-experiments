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

function createFunction(body = []) {
  return {
    "type": "FunctionDeclaration",
    "id": {
      "type": "Identifier",
      "name": "Module"
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

function createConstVar(vars) {
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
          "type": "Identifier",
          "name": "props"
        }
      }
    ],
    "kind": "const"
  };
}

function createReturn(htmlAst) {
  console.log('htmlAst =', htmlAst);
  // const ast = 
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

function createElement(htmlAst) {
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
      createObject(htmlAst.attributes),
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
          }
        } else {
          result.arguments.push(createElement(child))
        } 
      }
      i++;
    }
    
    return result;
  }

  
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
        "value": {
          "type": "StringLiteral",
          "value": obj[name]
        }
      }
    })
  }
}

function toReactAst(htmlAst, page) {
  const propKeys = Object.keys(page.data || {});
  const target = createProgram([
    createFunction([
      createConstVar(propKeys),
      createReturn(htmlAst),
    ]),
  ]);
  return target;
}


export {
  toReactAst,
}