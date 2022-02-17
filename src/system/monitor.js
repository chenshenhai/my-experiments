const path = require('path');
const childProcess = require('child_process');

function monitor() {
  const child = childProcess.fork(path.join(__dirname, 'monitor-server.js'));
  
  setInterval(() => {
    const mem = getMemoryInfo();
    child.send({ mem });
  }, 10 * 1000)
}

function getMemoryInfo() {
  const used = process.memoryUsage();
  return {
    rss: used.rss,
    heapTotal: used.heapTotal,
    heapUsed: used.heapUsed,
  }
}

module.exports = {
  monitor,
}