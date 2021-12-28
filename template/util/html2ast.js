
function html2ast(html) {
  const regStartTag = /<([a-zA-Z_][\w\-\.]*)((?:\s+([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))*)\s*(\/?)>/;
  const regEndTag = /<\/([a-zA-Z_][\w\-\.]*)>/;
  const regAttr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

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
      match = html.match(regEndTag);
      if (match) {
        chars = false;
        html = html.substring(match[0].length);
        match[0].replace(regEndTag, parseEndTag);
      }
    } else if (html.indexOf('<') == 0) {
      match = html.match(regStartTag);
      if (match) {
        chars = false;
        html = html.substring(match[0].length);
        match[0].replace(regStartTag, parseStartTag);
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
        pushChildren(node);
      }
    }
  }
  function pushChildren(node) {
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
    const directives = {};
    const events = {};
    let unary = !!arguments[7];
    const node = {
      type: 'element',
      tag: tagName
    };

    rest = rest.replace(regAttr, function(match, name) {
      const value = arguments[2] ? arguments[2] : 
          arguments[3] ? arguments[3] : 
            arguments[4] ? arguments[4] : '';
      if (['bindtap'].includes(name)) {
        events['bindtap'] = value;
      } else if (name.indexOf('xx:') >= 0) {
        if (value.indexOf('{{') >= 0) {
          directives[name] = value
        } else {
          directives[name + value] = '';
        }
      } else {
        attributes[name] = value
      }
      return;
    });
    node.attributes = attributes;
    node.directives = directives;
    if (!unary) {
      bufArray.push(node);
    } else {
      pushChildren(node);
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
      pushChildren(bufArray.pop());
    }
  }
  return result;
}

export default html2ast;