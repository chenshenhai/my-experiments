const path = require('path');
const fs = require('fs');
const eventStream = require('event-stream');

const distDir = path.join(__dirname, '..', 'dist');
const filePath = path.join(distDir, 'bigfile.log');
const newFilePath = path.join(distDir, 'bigfile-es.log');

fs.writeFileSync(newFilePath, '');
fs.createReadStream(filePath, {flags: 'r'})
  .pipe(eventStream.split())
  .pipe(eventStream.map(function (line, cb) {
    fs.appendFileSync(newFilePath, line + '\r\n');
    cb(null, line)
  })).on('end', () => {
    const stat = fs.statSync(newFilePath);
    console.log(`size = ${(stat.size / 1024).toFixed(2)}KB`);
  })




