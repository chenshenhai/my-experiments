const { doPool } = require('./util');
const config = require('./config');

async function main() {
  const sql = `CREATE DATABASE ${config.database};`;
  const result = await doPool(sql);
  console.log(result, );
  console.log('create database success!');
}

main();