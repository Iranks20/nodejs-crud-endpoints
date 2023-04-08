// 'use strict';
// const mysql = require('mysql');
// // heroku mysql db connection
// const dbConn = mysql.createConnection({
//   host     : "localhost",
//   user     : "root",
//   password : "",
//   database : "node_mysql_crud_db"
// });
// dbConn.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected!");
// });

// heroku corrections
// const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");

// var connection = mysql.createPool({
//   host: "us-cdbr-east-06.cleardb.net",
//   user: "b409f650b51f57",
//   password: "97683a12",
//   database: "heroku_3bb23431b16fa95"
// });

//  module.exports = connection;




 'use strict';
const mysql = require('mysql');
// local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node_mysql_crud_db'
});
dbConn.connect(function(err) {
  if (err) {
    console.log('Error connecting to database: ', err);
  } else {
    console.log('connected to database.')
  }
});
module.exports = dbConn;

