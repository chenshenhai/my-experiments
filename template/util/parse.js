import html2ast from './html2ast.js';

export function parseComponent(comp) {
  const { html, js, css } = comp;
  const ast = html2ast(html);
  console.log('ast =', ast);
}
