import fs from 'fs';
import http from 'http';
import { mimes } from './constant';

function fileMime (extName: string) {
  return mimes[extName] || 'text/plain';
}

export function getContentType(extName: string) {
  const types = [];
  types.push(fileMime(extName));
  types.push('charset=utf-8');
  return types.join('; ');
}


export function renderFileContent (
  req: http.IncomingMessage, res: http.ServerResponse,
  filePath: string, extName: string,
) {
  const stat = fs.statSync(filePath);
  if (stat.isFile()) {
    resPage(req, res, filePath, extName);
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write(`
      <h1>404: 找不到文件</h1>
    `);
    res.end();
  }
}

function resPage(
  req: http.IncomingMessage, res: http.ServerResponse,
  filePath: string, extName: string
) {
  const content = fs.readFileSync(filePath, 'binary');
  const contentType = getContentType(extName);
  res.writeHead(200, {
    'Content-Type': contentType,
  });
  res.write(content, 'binary');
  res.end();
}
