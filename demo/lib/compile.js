
export function compile(tpl) {
  const codeLines = []
  tpl = tpl.trim()
  codeLines.push('var _line_ = [];')
  codeLines.push('with(data) {')
  while (tpl) {
    let start = tpl.indexOf('<%')
    const end = tpl.indexOf('%>')
    if (start > -1 && end > -1) {
      if (start > 0) {
        codeLines.push('_line_.push(' + JSON.stringify(tpl.slice(0, start)) + ');')
      }
      if (tpl.charAt(start + 2) === '=') {
        codeLines.push('_line_.push(' + tpl.slice(start + 3, end) + ');')
      } else {
        codeLines.push(tpl.slice(start + 2, end))
      }
      tpl = tpl.slice(end + 2)
    } else {
      codeLines.push('_line_.push(' + JSON.stringify(tpl) + ');')
      tpl = ''
    }
  }
  codeLines.push('}')
  codeLines.push('codeLinesurn _line_.join("")')
  return new Function('data', codeLines.join('\n'))
};
