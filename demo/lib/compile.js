
export function compile(tpl) {
  const codeLines = []
  tpl = tpl.trim()
  codeLines.push('var _line_ = [];')
  codeLines.push('with(data) {')
  while (tpl) {
    let start = tpl.indexOf('{{')
    const end = tpl.indexOf('}}')
    if (start > -1 && end > -1) {
      if (start > 0) {
        codeLines.push('_line_.push(' + JSON.stringify(tpl.slice(0, start)) + ');')
      }
      let script = tpl.slice(start + 2, end);
      if (/(\$for|\$if)/.test(script)) {
        script = script + ' {';
        script = script.replace(/\$/ig, '')
        codeLines.push(script)
      } else if (/\$end/.test(script)) {
        script = script.replace(/\$end/ig, '}')
        codeLines.push(script)
      } else {
        codeLines.push('_line_.push(' + script + ');')
      }

      tpl = tpl.slice(end + 2)
    } else {
      codeLines.push('_line_.push(' + JSON.stringify(tpl) + ');')
      tpl = ''
    }
  }
  codeLines.push('}')
  codeLines.push('return _line_.join("")');
  return new Function('data', codeLines.join('\n'))
};
