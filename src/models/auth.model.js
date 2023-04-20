const pool = require('../../config/db.config');

function getUserByEmail(email, callback) {
  const query = 'SELECT * FROM userss WHERE email = ?';
  pool.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    // connection.release();
    callback(null, results[0]);
  });
}

// forgot password
function getByEmail(email, callback) {
  pool.query('SELECT * FROM userss WHERE email = ?', [email], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback('User not found', null);
    // connection.release();
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
  pool.query('UPDATE userss SET otp = ? WHERE email = ?', [otp, email], (err) => {
    if (err) return callback(err);
    // connection.release();
    return callback(null);
  });
}

function updateStatus (email, Status, callback) {
  pool.query('UPDATE userss SET Status = ? WHERE email = ?', [Status, email], (err) => {
    if (err) return callback(err);
    // connection.release();
    return callback(null);
  });
}

// update password
function updatePassword (id, password, callback) {
  pool.query('UPDATE userss SET password = ? WHERE id = ?', [password, id], (err) => {
    if (err) return callback(err);
    // connection.release();
    return callback(null);
  });
}

module.exports = {
  getUserByEmail,
  getByEmail,
  updatePassword,
  updateOtp,
  updateStatus
};
