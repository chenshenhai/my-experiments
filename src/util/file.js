const fs = require('fs');
const path = require('path');



function readAllFilePath(dir) {
  const dirPath = path.resolve(dir);
  const baseDir = dirPath;
  const list = [];
  function readFilePath(filePath){
    const files = fs.readdirSync(filePath);
    files.forEach(function(fileName){
      const fileDir = path.join(filePath, fileName);
      const stats = fs.statSync(fileDir)
      if(stats.isFile()){
        let resultPath = fileDir.replace(baseDir, '');
        if (resultPath.startsWith('/')) {
          resultPath = resultPath.replace(/^\//, '');
        }
        list.push(resultPath)
      } else if(stats.isDirectory()){
        readFilePath(fileDir);
      }
    });
  }
  readFilePath(dirPath)
  return list;
}

const list = readAllFilePath(path.join(__dirname, '..', '..'));
console.log('list ===', list);

