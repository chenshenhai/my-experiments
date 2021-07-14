const mysql = require('mysql');
const config = require('./config');

const conn = mysql.createPool(config);
const dbConn = mysql.createConnection(config)

function connect(sql) {
  return new Promise((resolve, reject) => {
    conn.query(sql, (error, results, fields) => {
      if (error) {
        conn.end();
        reject(error);
      } else {
        conn.end();
        resolve(results, fields);
      }
    });
  });
}

function dbConnect(sql, values) {
  return new Promise((resolve, reject) => {
    dbConn.connect();
    dbConn.query(sql, values, (err, rows) => {
      if (err) {
        dbConn.end();
        reject(err);
      } else {
        dbConn.end();
        resolve(rows);
      }
    })
  });
}

module.exports = {
  connect,
  dbConnect,
}