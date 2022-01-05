export function clearBabelAst(ast) {
  delete ast.start;
  delete ast.end;
  delete ast.loc;
  delete ast.errors;
  if (ast.type === 'File') {
    clearBabelAst(ast.program)
  } else if (ast.type === 'FunctionDeclaration') {
    clearBabelAst(ast.id);
    clearBabelAst(ast.body);
    if (Array.isArray(ast.params)) {
      ast.params.forEach((item) => {
        clearBabelAst(item);
      })
    }
  } else if (ast.type === 'VariableDeclaration') {
    if (Array.isArray(ast.declarations)) {
      ast.declarations.forEach((item) => {
        clearBabelAst(item);
      })
    }
  } else if (ast.type === 'VariableDeclarator') {
    clearBabelAst(ast.id);
    clearBabelAst(ast.init);
  } else if (ast.type === 'ObjectPattern') {
    if (Array.isArray(ast.properties)) {
      ast.properties.forEach((item) => {
        clearBabelAst(item);
      })
    }
  } else if (ast.type === 'ObjectProperty') {
    clearBabelAst(ast.key);
    clearBabelAst(ast.value);
  } else if (ast.type === 'AssignmentPattern') {
    clearBabelAst(ast.left);
    clearBabelAst(ast.right);
  } else if (ast.type === 'ReturnStatement') {
    clearBabelAst(ast.argument);
  }
  // else if (ast.type === 'CallExpression') {
  //   clearBabelAst(ast.argument);
  //   clearBabelAst(ast.callee);
  //   if (Array.isArray(ast.arguments)) {
  //     ast.arguments.forEach((item) => {
  //       clearBabelAst(item);
  //     })
  //   } 
  // } 
  else {
    if (Array.isArray(ast.body)) {
      ast.body.forEach((item) => {
        clearBabelAst(item);
      })
    } else if (ast.body) {
      clearBabelAst(ast.body);
    }
  }
}