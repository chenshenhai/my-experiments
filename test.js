const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const compose = require('koa-compose');
const spawn = childProcess.spawn;

function readProjectDirs() {
  const pkgsPath = path.join(__dirname, 'packages');
  const files = fs.readdirSync(pkgsPath);
  const dirs = [];
  files.forEach((dir) => {
    const pkgFile = path.join(pkgsPath, dir, 'package.json');
    if (fs.existsSync(pkgFile)) {
      dirs.push(path.join(pkgsPath, dir))
    }
  });
  return dirs;
}


function execProcess(cmd, args, dir) {
  return new Promise((resolve, reject) => {
    const subprocess = spawn(cmd, args, { cwd: dir, stdio: 'inherit'  });

    subprocess.on('close', (code) => {
      subprocess.kill();
      resolve();
    });

    subprocess.on('error', (err) => {
      subprocess.kill();
      reject(err);
    });

    subprocess.on('exit', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
}

function createInstallTask(dir) {
  return async function(ctx, next) {
    const stdout = await execProcess('cnpm', ['i'], dir);
    console.log(stdout);
    await next();
  }
}

function createTestTask(dir) {
  return async function(ctx, next) {
    const stdout = await execProcess('npm', ['run', 'test'], dir);
    console.log(stdout);
    await next();
  }
}


async function main() {
  const dirs = readProjectDirs();
  const taskList = [];
  dirs.forEach((dir) => {
    const installTask = createInstallTask(dir);
    const testTask = createTestTask(dir);
    taskList.push(installTask);
    taskList.push(testTask);
  });
  await compose(taskList)({});
}

main();