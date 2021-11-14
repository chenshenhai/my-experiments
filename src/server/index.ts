import path from 'path';
import { server } from './lib/server';

server(path.join(__dirname, '..', '..'), {
  port: 3001
});