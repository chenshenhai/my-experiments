import http from 'http';
import path from 'path';
import os from 'os'; 

export function getFileInfo (targetDir: string, req: http.IncomingMessage) {
  let pathResolve = targetDir;
  let pathname = req.url || '';

  let filePath = pathResolve + pathname;
  const pathArr = filePath.split('\/');

  let fileName = pathArr[ pathArr.length - 1 ];
  let basePath = pathArr.slice(0, pathArr.length - 1).join('/');

  let extName = path.extname(filePath);
  extName = extName ? extName.slice(1) : 'unknown';

  const platform = os.platform();

  if (platform === 'win32') {
    basePath = basePath.replace(/\//g, '\\');
    filePath = filePath.replace(/\//g, '\\');
  } else {
    basePath = basePath.replace(/\\/g, '\/');
    filePath = filePath.replace(/\\/g, '\/');
  }

  return {
    'basePath': basePath,
    'filePath': filePath,
    'fileName': fileName,
    'extName': extName
  };
};


