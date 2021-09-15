console.log('Hello devtools!')


chrome.devtools.panels.create(
  'HelloWorld',
  '../icon.png',
  '../page/panel.html', function(panel) {
  // TODO
  // alert('Hello panel')
});