import babelParser from '@babel/parser'; 


function clearAst(ast) {
  Object.keys(ast).forEach((name) => {
    if (['start', 'end', 'loc', 'extra'].includes(name)) {
      delete ast[name];
    } else if (Array.isArray(ast[name])) {
      ast[name].forEach((item) => {
        clearAst(item);
      })
    } else if (Object.prototype.toString.call(ast[name]) === '[object Object]') {
      clearAst(ast[name]);
    }
  })
}


function parseJsAst(js) {
  const ast = babelParser.parse(js, {
    sourceType: "module",
    plugins: [],
  });
  clearAst(ast);
  return ast;
}


function parseMainMethodsJsAst(jsAst) {
  const asts = [];
  for (let i = 0; i < jsAst.program.body.length; i++) {
    const item = jsAst.program.body[i];
    if (
      item.type === 'ExpressionStatement' && item.expression
      && item.expression.callee.name === 'ModuleConfig'
      && item.expression.arguments
      && item.expression.arguments.length === 1
      && item.expression.arguments[0].type === 'ObjectExpression'
      && item.expression.arguments[0].properties.length > 0
    ) {
      const properties = item.expression.arguments[0].properties;
      properties.forEach((prop) => {
        if (prop.type === 'ObjectProperty' && prop.value.type === 'FunctionExpression') {
          const func = prop.value;
          asts.push({
            "type": "ClassMethod",
            "static": false,
            "key": {
              "type": "Identifier",
              "name": prop.key.name
            },
            "computed": false,
            "kind": 'method',
            "id": null,
            "generator": false,
            "async": false,
            "params": [],
            "body": func.body,
          })
        } else if (prop.type === 'ObjectMethod' && prop.method === true) {
          asts.push({
            "type": "ClassMethod",
            "static": false,
            "key": {
              "type": "Identifier",
              "name": prop.key.name
            },
            "computed": false,
            "kind": 'method',
            "id": null,
            "generator": false,
            "async": false,
            "params": [],
            "body": prop.body,
          })
        }
      })
    }
  }

  return asts;
}

export {
  parseJsAst,
  parseMainMethodsJsAst
}