const path = require('path');
const childProcess = require('child_process');

function monitor() {
  const child = childProcess.fork(path.join(__dirname, 'monitor-server.js'));
  
  // setInterval(() => {
  //   child.send({ hello: 'data from master' });
  // })
}

module.exports = {
  monitor,
}