const { doConnect } = require('./util');

main();

async function main() {
  await insertData();
}


async function insertData() {
  const sql = `
    INSERT INTO \`user_info\` SET ?;
  `;
  const values = {
    name: 'Hello',
    password: Math.random().toString(36).substr(2),
  }
  const result = await doConnect(sql, values);
  if (result.insertId > 0) {
    console.log('insert table success!');
  } else {
    console.log('insert table fail!');
  }
}
