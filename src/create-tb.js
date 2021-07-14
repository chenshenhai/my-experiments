const { dbConnect } = require('./util');

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
dbConnect(sql, {}).then((rows) => {
  console.log(rows);
  console.log('create table success!');
}).catch((err) => console.log(err));
