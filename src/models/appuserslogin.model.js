
const pool = require('../../config/db.config');

function getUserByEmail(email, callback) {
  const query = 'SELECT * FROM reporters WHERE email = ?';
  pool.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    // connection.release();
    callback(null, results[0]);
    console.log(results[0])
  });
}

module.exports = {
    getUserByEmail
  };
  