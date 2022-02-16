//  DevTools > Memory > Profiler > Load
const path = require('path');
const heapdump = require('heapdump');

const myTestCache = {};

function setCache() {
  myTestCache[`Hello_${Date.now()}`] = new Array(1e7);
  const mem = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log('mem(MB) =', mem)
  if (mem > 800) {
    const snapshotDir = path.join(__dirname, '..', 'snapshot')
    heapdump.writeSnapshot(path.join(snapshotDir, `memory-${Date.now()}.heapsnapshot`))
    console.log('Stack Overlfow! ')
    process.exit(1);
  } else {
    setCache()
  }
}

setCache();