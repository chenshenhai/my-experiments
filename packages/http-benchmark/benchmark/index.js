const autocannon = require('autocannon');
const Koa = require('koa');


// async/await
async function main () {

  const app = new Koa();
  app.use(async (ctx) => {
    ctx.body = 'Hello World';
  })
  app.listen(3000, async () => {
    const result = await autocannon({
      url: 'http://localhost:3000',
      connections: 10, //default
      pipelining: 1, // default
      duration: 10 // default
    })
    console.log(result)
    process.exit(0);
  })
  
}

main();