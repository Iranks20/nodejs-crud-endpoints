
const pool = require('../../config/db.config');

function getUserByEmail(email, callback) {
  const query = 'SELECT * FROM reporters WHERE email = ?';
  pool.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
    console.log(results[0])
  });
}

// updating login time
function updateLoginTime(userId, callback) {
  const query = 'UPDATE reporters SET logintime = CURRENT_TIMESTAMP WHERE id = ?';
  pool.query(query, [userId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

// forgot password
function getByEmail(email, callback) {
  pool.query('SELECT * FROM reporters WHERE email = ?', [email], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback('User not found', null);
    return callback(null, results[0]);
  });
}
// function updatePassword(id, password, callback) {
//   pool.query('UPDATE users SET password = ? WHERE id = ?', [password, id], (err) => {
//     if (err) return callback(err);
//     return callback(null);
//   });
// }

function updateOtp (email, otp, callback) {
  pool.query('UPDATE reporters SET otp = ? WHERE email = ?', [otp, email], (err) => {
    if (err) return callback(err);
    // connection.release();
    return callback(null);
  });
}

function updateStatus (email, Status, callback) {
  pool.query('UPDATE reporters SET Status = ? WHERE email = ?', [Status, email], (err) => {
    if (err) return callback(err);
    // connection.release();
    return callback(null);
  });
}

// update password
function updatePassword (id, password, callback) {
  pool.query('UPDATE reporters SET password = ? WHERE id = ?', [password, id], (err) => {
    if (err) return callback(err);
    // connection.release();
    return callback(null);
  });
}

module.exports = {
    getUserByEmail,
    updateLoginTime,
    getByEmail,
    updatePassword,
    updateOtp,
    updateStatus
  };
  