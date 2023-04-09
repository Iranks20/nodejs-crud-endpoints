const db = require('../../config/db.config');

function getUserByEmail(email, callback) {
  const query = 'SELECT * FROM userss WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }

    callback(null, results[0]);
  });
}

// forgot password
function getByEmail(email, callback) {
  db.query('SELECT * FROM userss WHERE email = ?', [email], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback('User not found', null);
    return callback(null, results[0]);
  });
}
// function updatePassword(id, password, callback) {
//   db.query('UPDATE users SET password = ? WHERE id = ?', [password, id], (err) => {
//     if (err) return callback(err);
//     return callback(null);
//   });
// }

function updateOtp (email, otp, callback) {
  db.query('UPDATE userss SET otp = ? WHERE email = ?', [otp, email], (err) => {
    if (err) return callback(err);
    return callback(null);
  });
}

function updateStatus (email, Status, callback) {
  db.query('UPDATE userss SET Status = ? WHERE email = ?', [Status, email], (err) => {
    if (err) return callback(err);
    return callback(null);
  });
}

// update password
function updatePassword (id, password, callback) {
  db.query('UPDATE userss SET password = ? WHERE id = ?', [password, id], (err) => {
    if (err) return callback(err);
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
