import http from 'http';
import Render from './render';

export async function server(targetDir: string, options: { port: number }) {
  let server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    const render = new Render(targetDir, req, res);
    render.init();
  });

  const port = options.port || 8001;
  server.listen(port, function () {
    console.log(`Start http://127.0.0.1:${port}`);
  });
}
