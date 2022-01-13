const unclosedElements =  {
  "img": true,
};
const attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g
const elementRE = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g
const whitespaceRE = /^\s*$/

function setAttr(elem, key, val) {
  if (key.startsWith('@:')) {
    elem.directives[key] = val;
  } else if (['onClick'].includes(key)) {
    elem.events[key] = val;
  } else {
    elem.attributes[key] = val;
  }
}

function parseElement(element) {
  const res = {
    type: 'element',
    name: '',
    unclosed: false,
    attributes: {},
    directives: {},
    events: {},
    children: [],
  }

  const elementMatch = element.match(/<\/?([^\s]+?)[/\s>]/)
  if (elementMatch) {
    res.name = elementMatch[1]
    if (
      unclosedElements[elementMatch[1]] ||
      element.charAt(element.length - 2) === '/'
    ) {
      res.unclosed = true
    }

    // handle comment element
    if (res.name.startsWith('!--')) {
      const endIndex = element.indexOf('-->')
      return {
        type: 'comment',
        comment: endIndex !== -1 ? element.slice(4, endIndex) : '',
      }
    }
  }

  const reg = new RegExp(attrRE)
  let result = null
  while (true) {
    result = reg.exec(element)

    if (result === null) {
      break
    }

    if (!result[0].trim()) {
      continue
    }

    if (result[1]) {
      const attr = result[1].trim()
      let arr = [attr, '']
      if (attr.indexOf('=') > -1) {
        arr = attr.split('=')
      }
      setAttr(res, arr[0], arr[1])
      reg.lastIndex--
    } else if (result[2]) {
      setAttr(res, result[2], result[3].trim().substring(1, result[3].length - 1))
    }
  }

  return res
}

function parse(html) {
  const result = []
  const arr = []
  let current
  let level = -1
  let inComponent = false

  html.replace(elementRE, function (element, index) {
    if (inComponent) {
      if (element !== '</' + current.name + '>') {
        return
      } else {
        inComponent = false
      }
    }
    const isOpen = element.charAt(1) !== '/'
    const isComment = element.startsWith('<!--')
    const start = index + element.length
    const nextChar = html.charAt(start)
    let parent

    if (isComment) {
      const comment = parseElement(element)

      // if we're at root, push new base node
      if (level < 0) {
        result.push(comment)
        return result
      }
      parent = arr[level]
      parent.children.push(comment)
      return result
    }

    if (isOpen) {
      level++

      current = parseElement(element)
      if (
        !current.unclosed &&
        !inComponent &&
        nextChar &&
        nextChar !== '<'
      ) {
        const content = html.slice(start, html.indexOf('<', start));
        if (content.trim()) {
          current.children.push({
            type: 'text',
            content: content.trim(),
          })
        }
        
      }

      if (level === 0) {
        result.push(current)
      }

      parent = arr[level - 1]

      if (parent) {
        parent.children.push(current)
      }

      arr[level] = current
    }

    if (!isOpen || current.unclosed) {
      if (
        level > -1 &&
        (current.unclosed || current.name === element.slice(2, -1))
      ) {
        level--
        current = level === -1 ? result : arr[level]
      }
      if (!inComponent && nextChar !== '<' && nextChar) {
        parent = level === -1 ? result : arr[level].children

        const end = html.indexOf('<', start)
        let content = html.slice(start, end === -1 ? undefined : end)
        if (whitespaceRE.test(content)) {
          content = ' '
        }
        
        if ((end > -1 && level + parent.length >= 0) || content !== ' ') {
          if (content.trim()) {
            parent.push({
              type: 'text',
              content: content.trim(),
            })
          }
        }
      }
    }
  })

  return result
}

export {
  parse
};