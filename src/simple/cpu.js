//  DevTools > More tools > JavaScript Profiler > Load
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const profiler = require('v8-profiler-node8');
const snapshotDir = path.join(__dirname, '..', 'snapshot')

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}

async function snapshot(fn, time = 10000) {
  profiler.startProfiling('CPU Profile');
  fn();
  await delay(time);
  const profile = profiler.stopProfiling();
  profile.export()
    .pipe(fs.createWriteStream(path.join(snapshotDir, `cpu-${Date.now()}.cpuprofile`)))
    .on('finish', () => {
      profile.delete();
    });
}


function action() {
  for (let i = 0; i < 100; i++) {
    const password = 'HelloWorld'
    const salt = crypto.randomBytes(128).toString('base64')
    const str = crypto.pbkdf2Sync(password, salt, 30000, 64, 'sha512').toString('hex')
    console.log(str)
  }
}

snapshot(action);