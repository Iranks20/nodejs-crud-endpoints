// const jwt = require('jsonwebtoken');
// const keys = require('../../config/key.config');


// function verifyToken(req, res, next) {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, keys.JWT_SECRET, (err, decodedToken) => {
//     console.log(decodedToken)
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorizedbbbb', err });
//     }

//     req.userId = decodedToken.userId;
//     next();
//   });
// }

// module.exports = verifyToken;

const jwt = require('jsonwebtoken');
const keys = require('../../config/key.config');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const verified = jwt.verify(token, keys.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.',);
  }
};

