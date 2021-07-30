const { doConnect } = require('./util');

main();

async function main() {
  await createTable();
}

async function createTable() {
  const sql = `
  CREATE TABLE  IF NOT EXISTS  \`user_info\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT, 
    \`password\` varchar(255) DEFAULT NULL, 
    \`name\` varchar(255) DEFAULT NULL, 
    \`create_time\` varchar(20) DEFAULT NULL, 
    \`modified_time\` varchar(20) DEFAULT NULL,
    PRIMARY KEY (\`id\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `;
  const result = await doConnect(sql);
  console.log(result);
  console.log('create table success!');
}

