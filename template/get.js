async function getHTML(name) {
  return new Promise((resolve, reject) => {
    const url = getSrcPath(`component/${name}.html`);
    fetch(url).then(res => res.text()).then(resolve).catch(reject)
  });
}

async function getJS(name) {
  return new Promise((resolve, reject) => {
    const url = getSrcPath(`component/${name}.js`);
    fetch(url).then(res => res.text()).then(resolve).catch(reject)
  });
}

async function getCSS(name) {
  return new Promise((resolve, reject) => {
    const url = getSrcPath(`component/${name}.css`);
    fetch(url).then(res => res.text()).then(resolve).catch(reject)
  });
}

function getSrcPath(str) {
  const paths = window.location.pathname.split('/');
  paths.pop();
  paths.push(str || '')
  return paths.join('/')
}

export async function getComponent(name) {
  return Promise.all([
    getHTML(name),
    getJS(name),
    getCSS(name)
  ])
}