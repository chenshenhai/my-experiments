function addScript(src) {
  const script = document.createElement('script');
  script.setAttribute('type', 'module')
  script.src = chrome.extension.getURL(src);
  const head = document.head || document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.lastChild);
}

addScript('js/inject.js');