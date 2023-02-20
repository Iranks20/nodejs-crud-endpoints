'use strict';
const mysql = require('mysql');
// heroku mysql db connection
// const dbConn = mysql.createConnection({
//   host     : "us-cdbr-east-06.cleardb.net",
//   user     : "b409f650b51f57",
//   password : "97683a12",
//   database : "heroku_3bb23431b16fa95"
// });
// dbConn.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected!");
// });

// heroku corrections

const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// module.exports = connection;

//ec2-user
// const dbConn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '@United100',
//   database : 'node_mysql_crud_db'
// });
// dbConn.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected!");
// });
module.exports = dbConn;