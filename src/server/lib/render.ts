import http from 'http';
import fs from 'fs';
import { getFileInfo } from './info';
import { renderFileContent, getContentType } from './content';
import { renderDir } from './dir';

export default class Render {
  private _targetDir: string;
  private _req: http.IncomingMessage;
  private _res: http.ServerResponse;
  constructor (targetDir: string, req: http.IncomingMessage, res: http.ServerResponse) {
    this._targetDir = targetDir;
    this._req = req;
    this._res = res;
  }

  init () {
    const req = this._req;
    const res = this._res;
    const targetDir = this._targetDir;
    const fileInfo = getFileInfo(targetDir, req);
    const exist = fs.existsSync(fileInfo.filePath);
    
    if (!exist) {
      res.writeHead(404, {
        'Content-Type': getContentType('html'),
        'encode': 'utf-8'
      });
      res.write(`<h1>404: Not Found!</h1>`);
      res.end();
    } else {
      const stat = fs.statSync(fileInfo.filePath);
      if (stat.isDirectory()) {
        renderDir(targetDir, req, res);
      } else {
        renderFileContent(
          req,
          res,
          fileInfo.filePath,
          fileInfo.extName,
        );
      }
    }
  }
};

module.exports = Render;
