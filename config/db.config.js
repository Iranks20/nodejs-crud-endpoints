'use strict';
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_mysql_crud_db',
  connectionLimit: 10 // set the maximum number of connections to 10
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }

  console.log('Connected to database!');
  connection.release();
});

module.exports = pool;
