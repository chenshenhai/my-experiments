import { transform } from './lib/transform.js';
async function run() {
  const jsx = await fetch('./src/app.jsx').then(res => res.text());
  const js = transform(jsx);
  const script = document.createElement('script');
  script.type = 'module';
  script.text = js;
  document.querySelector('body').appendChild(script);
}

run();