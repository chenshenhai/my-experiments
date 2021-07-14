const path = require('path');
const fs = require('fs');
const eventStream = require('event-stream');

const distDir = path.join(__dirname, '..', 'dist');
const filePath = path.join(distDir, 'bigfile.log');
const newFilePath = path.join(distDir, 'bigfile-es-3.log');

fs.writeFileSync(newFilePath, '');

function writeLine(text) {
  return new Promise((resolve, reject) => {
    fs.appendFile(newFilePath, text, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}

let lines = [];
fs.createReadStream(filePath, {flags: 'r'})
  .pipe(eventStream.split())
  .pipe(eventStream.map(async function (line, cb) {
    if (lines.length < 10) {
      lines.push(line);
      cb(null, line)
    } else {
      const text = lines.join('\r\n') + '\r\n';
      lines = [];
      await writeLine(text);
      cb(null, line)
    }
  })).on('end', () => {
    if (lines.length > 0) {
      fs.appendFileSync(newFilePath, lines.join('\r\n') + '\r\n');
      lines = [];
    }
    const stat = fs.statSync(newFilePath);
    console.log(`size = ${(stat.size / 1024).toFixed(2)}KB`);
  })




