const path = require('path');
const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const distDir = path.join(__dirname, '..', 'dist');
const filePath = path.join(distDir, 'bigfile.log');
const newFilePath = path.join(distDir, 'bigfile-readline.log');

const inStream = fs.createReadStream(filePath);
const outStream = new Stream();

const readInter = readline.createInterface({
  input: inStream,
  output: outStream,
  terminal: false
})
readInter.on('line', (line) => {
  fs.appendFileSync(newFilePath, line + '\r\n');
}).on('close', () => {
  const stat = fs.statSync(newFilePath);
  console.log(`size = ${(stat.size / 1024).toFixed(2)}KB`);
});