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

function createReturn() {
  return {
    "type": "ReturnStatement",
    "argument": {
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
      "arguments": []
    }
  }
}

function parseAst(target, html) {

}

function toReactAst(htmlAst, page) {
  const propKeys = Object.keys(page.data || {});
  const target = createProgram([
    createFunction([
      createConstVar(propKeys),
      createReturn(),
    ]),
  ]);
  htmlAst.forEach((html) => {
    parseAst(target, html);
  });
  return target;
}


export {
  toReactAst,
}