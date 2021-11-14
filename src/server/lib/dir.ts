import path from 'path';
import http from 'http';
import fs from 'fs';
import { mimes } from './constant';


function readDirContent(pathResolve: string) {
  const files = fs.readdirSync(pathResolve);
  const dirList = [];
  const fileList = [];
  for (let i = 0, len = files.length; i < len; i++) {
    const item = files[i];
    const itemArr = item.split('\.');

    const itemMime = (itemArr.length > 1) ? itemArr[ itemArr.length - 1 ] : 'undefined';

    if (typeof mimes[ itemMime ] === 'undefined') {
      dirList.push(files[i]);
    } else {
      fileList.push(files[i]);
    }
  }

  const result = dirList.concat(fileList);
  return result;
};

export function renderDir(targetDir: string, req: http.IncomingMessage, res: http.ServerResponse) {
  const pathname = req.url || '';
  const pathResolve = path.join(targetDir, pathname);
  const files = readDirContent(pathResolve);
  const html = `
    <ul>
      ${files.map((file) => {
        return `
        <li>
          <a href="${[pathname === '/' ? '' : pathname, file].join('/')}">${file}</a>
        </li>
        `
      }).join('\r\n')}
    </ul>
  `
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(html);
  res.end();
}


