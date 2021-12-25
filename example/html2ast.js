
function html2ast(html) {
  const startTag = /<([a-zA-Z_][\w\-\.]*)((?:\s+([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))*)\s*(\/?)>/;
  const endTag = /<\/([a-zA-Z_][\w\-\.]*)>/;
  const attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

  const bufArray = [];
  const result = {
    type: 'root',
    children: []
  };
  let chars;
  let match;
  let last;

  while (html && last != html) {
    last = html;
    chars = true;
    if (html.indexOf('</') == 0) {
      match = html.match(endTag);
      if (match) {
        chars = false;
        html = html.substring(match[0].length);
        match[0].replace(endTag, parseEndTag);
      }
    } else if (html.indexOf('<') == 0) {
      match = html.match(startTag);
      if (match) {
        chars = false;
        html = html.substring(match[0].length);
        match[0].replace(startTag, parseStartTag);
      }
    }
    if (chars) {
      let index = html.indexOf('<');
      let text = '';
      if (index < 0) {
        text = html;
        html = '';
      } else {
        text = html.substring(0, index);
        html = html.substring(index);
      }
      text = text.trim();
      if (text) {
        const node = {
          type: 'text',
          text
        };
        pushchildren(node);
      }
    }
  }
  function pushchildren(node) {
    if (bufArray.length === 0) {
      result.children.push(node);
    } else {
      const parent = bufArray[bufArray.length - 1];
      if (typeof parent.children == 'undefined') {
        parent.children = [];
      }
      parent.children.push(node);
    }
  }
  function parseStartTag(tag, tagName, rest) {
    tagName = tagName.toLowerCase();
    const attributes = {};
    let unary = !!arguments[7];
    const node = {
      type: 'element',
      tag: tagName
    };
    rest.replace(attr, function(match, name) {
      const value = arguments[2]
        ? arguments[2]
        : arguments[3]
        ? arguments[3]
        : arguments[4]
        ? arguments[4]
        : '';
        attributes[name] = value
    });
    node.attributes = attributes;
    if (!unary) {
      bufArray.push(node);
    } else {
      pushchildren(node);
    }
  }
  function parseEndTag(tag, tagName) {
    let position = 0;
    for (position = bufArray.length - 1; position >= 0; position--) {
      if (bufArray[position].tag == tagName) {
        break;
      }
    }
    if (position >= 0) {
      pushchildren(bufArray.pop());
    }
  }
  return result;
}

export default html2ast;