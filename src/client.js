const { Client } = require('./rpc/client');


async function main() {
  const client = new Client({
    port: 8081,
    host: '127.0.0.1'
  });
  await client.connect();
  
  const result1 = await client.call('func1', [1, 2]);
  console.log('result1 ===', result1);

  const result2 = await client.call('func1', [2, 3]);
  console.log('result2 ===', result2);

  const result3 = await client.call('func2', [4, 5]);
  console.log('result3 ===', result3);

  const result4 = await client.call('func2', [6, 7]);
  console.log('result4 ===', result4);

  client.close();
}

main();


