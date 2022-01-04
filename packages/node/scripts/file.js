import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export function readHTML(fileName) {
  const htmlPath = path.join(__dirname, '..', 'src', 'html', fileName);
  const html = fs.readFileSync(htmlPath, { encoding: 'utf8'})
  return html;
}

export function writeDistFile(filePath, content) {
  const distDir = path.join(__dirname, '..', 'dist');
  const fullPath = path.join(distDir, filePath);
  const fullDir = path.dirname(fullPath);
  if (!(fs.existsSync(fullDir) && fs.statSync(fullDir).isDirectory())) {
    fs.mkdirSync(fullDir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content);
}

