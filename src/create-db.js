const { connect } = require('./util');
const config = require('./config');

const sql = `create database ${config.database};`;
connect(sql).then((results, fields) => {
  console.log(results, fields);
  console.log('create database success!');
}).catch((err) => console.log(err));
