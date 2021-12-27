console.log('start master-process ...')

const path = require('path');
const childProcess = require('child_process');
const child = childProcess.fork(path.join(__dirname, 'child.js'));

child.on('message', (data) => {
  console.log('[master get data]:', data);
});
child.send({ hello: 'data from master' });