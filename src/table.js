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
    \`create_time\` datetime DEFAULT CURRENT_TIMESTAMP, 
    \`modified_time\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `;
  const result = await doConnect(sql);
  console.log(result);
  console.log('create table success!');
}
