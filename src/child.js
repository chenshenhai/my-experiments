console.log('start child-process ...')

process.on('message', (data) => {
  console.log('[child get data]:', data);
});

process.send({ hello: 'data from child' });