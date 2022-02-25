const { Server } = require('./rpc/server');

const server = new Server({
  port: 8081,
  host: '127.0.0.1',
});

function addNum(a, b) {
  return a + b;
}

function multipleNum(a, b) {
  return a * b;
}

server.register('func1', addNum)
server.register('func2', multipleNum);

server.listen(() => {
  console.log('server is starting...')
});

