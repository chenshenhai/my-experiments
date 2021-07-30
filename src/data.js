const { doConnect } = require('./util');

main();

async function main() {
  await insertData();
  await insertList();
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


async function insertList() {
  const sql = `
    INSERT INTO \`user_info\` (name, password) VALUES ?;
  `;
  const values =  [0, 1, 2, 3, 4].map((i) => {
    return [`Hello${i}`, Math.random().toString(36).substr(2)]
  })
  const result = await doConnect(sql, [values]);
  if (result.insertId > 0) {
    console.log('insert table success!');
  } else {
    console.log('insert table fail!');
  }
}
