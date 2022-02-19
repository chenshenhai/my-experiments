const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const childProcess = require('child_process');

const app = new Koa();

app.use(koaStatic(path.join(__dirname, 'public-monitor')));

app.listen(3002, () => {
  console.log('Start: http://127.0.0.1:3002')
});

process.on('message', (data) => {
  const { pid, mem } = data;
  const info = getProcessInfo(pid);
  console.log('info:', info);
});

function getProcessInfo(pid) {
  const output = childProcess.execSync(`ps -o pid,%cpu,%mem -p ${pid}`, {
    encoding: 'utf-8',
  });
  const strList = output.split('\n');
  const infoStr = strList[1] || '';
  const infoList = infoStr.split(' ');
  const dataList = [];
  infoList.forEach((info) => {
    if (info) {
      dataList.push(info);
    }
  })
  return {
    pid: dataList[0],
    cpu: `${dataList[1]}%`,
    mem: `${dataList[2]}%`,
  }
}