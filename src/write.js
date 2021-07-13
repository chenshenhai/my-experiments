const path = require('path');
const fs = require('fs');

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}
const filePath = path.join(distDir, 'bigfile.log');

fs.writeFileSync(filePath, '');
const count = 100;
for (let i = 0; i < count; i ++) {
  const str = `[${i}] ${Date.now()} Hello World\r\n`;
  fs.appendFileSync(filePath, str);
}


const stat = fs.statSync(filePath);
console.log(`size = ${(stat.size / 1024).toFixed(2)}KB`);
