import Koa from 'koa';
import { render } from './render';
const app = new Koa();
const port = 3001;

app.use(render)
app.listen(port, () => {
  console.log(`Starting at http://127.0.0.1:${port}`);
})

