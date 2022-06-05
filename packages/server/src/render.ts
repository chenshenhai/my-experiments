import Koa from 'koa';

export const render = async (ctx: Koa.Context) => {
  ctx.body = 'Hello World'
}