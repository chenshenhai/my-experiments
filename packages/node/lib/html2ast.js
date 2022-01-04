const lookup =  {
  "area": true,
  "base": true,
  "br": true,
  "col": true,
  "embed": true,
  "hr": true,
  "img": true,
  "input": true,
  "link": true,
  "meta": true,
  "param": true,
  "source": true,
  "track": true,
  "wbr": true
};
const attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g
const elementRE = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g
const whitespaceRE = /^\s*$/

function parseElement(element) {
  const res = {
    type: 'element',
    name: '',
    voidElement: false,
    attrs: {},
    children: [],
  }

  const elementMatch = element.match(/<\/?([^\s]+?)[/\s>]/)
  if (elementMatch) {
    res.name = elementMatch[1]
    if (
      lookup[elementMatch[1]] ||
      element.charAt(element.length - 2) === '/'
    ) {
      res.voidElement = true
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
  for (;;) {
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

      res.attrs[arr[0]] = arr[1]
      reg.lastIndex--
    } else if (result[2]) {
      res.attrs[result[2]] = result[3].trim().substring(1, result[3].length - 1)
    }
  }

  return res
}

const empty = Object.create(null);

function parse(html, options) {
  options || (options = {})
  options.components || (options.components = empty)
  const result = []
  const arr = []
  let current
  let level = -1
  let inComponent = false

  // handle text at top level
  if (html.indexOf('<') !== 0) {
    var end = html.indexOf('<')
    result.push({
      type: 'text',
      content: end === -1 ? html : html.substring(0, end),
    })
  }

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
      if (current.type === 'element' && options.components[current.name]) {
        current.type = 'component'
        inComponent = true
      }

      if (
        !current.voidElement &&
        !inComponent &&
        nextChar &&
        nextChar !== '<'
      ) {
        current.children.push({
          type: 'text',
          content: html.slice(start, html.indexOf('<', start)),
        })
      }

      // if we're at root, push new base node
      if (level === 0) {
        result.push(current)
      }

      parent = arr[level - 1]

      if (parent) {
        parent.children.push(current)
      }

      arr[level] = current
    }

    if (!isOpen || current.voidElement) {
      if (
        level > -1 &&
        (current.voidElement || current.name === element.slice(2, -1))
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
          parent.push({
            type: 'text',
            content: content,
          })
        }
      }
    }
  })

  return result
}

export {
  parse
};