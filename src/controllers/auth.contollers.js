const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db.config');
const userModel = require('../models/auth.model');
// const User = require('../models/User');
const mailer = require('../../config/mailer');


// exports.create = function(req, res) {
  // const new_incidence = new Incidence(req.body);
exports.signup = function(req, res) {
  const { name, email, phoneNumber, password, company, position, nationality } = req.body;

  // Check if user already exists
  db.query('SELECT * FROM userss WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error querying database: ', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      console.log('user exists')
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password: ', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

    Status = 'active'
    otp = "0000"

      // Insert the new user into the database
      db.query('INSERT INTO userss (name, email, phoneNumber, password, company, position, nationality, otp, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, email, phoneNumber, hashedPassword, company, position, nationality, Status, otp], (err, results) => {
        if (err) {
          console.error('Error inserting user into database: ', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        // Create a JWT token
        const token = jwt.sign({ email }, 'mysecretkey', { expiresIn: '1h' });

        return res.status(201).json({ error: false, message: 'User created successfully', status: 200 });
      });
    });
  });
};

// login
exports.login = function(req, res) {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error111111' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, 'my_secret_key');
      return res.json({ token });
    });
  });
}

exports.sendOtp = function(req, res) {
  const { email } = req.body;

  userModel.getByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: err, status: 500 });

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Send OTP to user's email
    const mailOptions = {
      from: 'irankundainnocent673@gmail.com',
      to: user.email,
      subject: 'Reset Password OTP',
      text: `Your OTP to reset password is ${otp}`,
    };

    mailer.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ error: error.message });

      userModel.updateOtp(email, otp, (err) => {
        if (err) return res.status(500).json({ error: err });

      userModel.updateStatus(email, 'pending', (err) => {
        if (err) return res.status(500).json({ error: err, status: 500 });

      return res.status(200).json({ message: 'OTP sent to your email', status: 200 });
    });
    });
    });
  });
}

// verifying otp
exports.verifyOtp = function(req, res) {
  const { email, otp } = req.body;

    userModel.getByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ error: err });

      if (user.Status !== 'pending') {
        return res.status(400).json({ error: 'Invalid request' });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }

      userModel.updateStatus(email, 'waiting', (err) => {
     
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json({ message: 'OTP verified comtinue' });
      });
    });
}

// update password
exports.updatePassword = function(req, res) {
  const { email, password } = req.body;

  userModel.getByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: err });

    if (user.Status !== 'waiting') {
      return res.status(400).json({ error: 'Invaliid request' });
    }

    const hash = bcrypt.hashSync(password, 10);

    userModel.updatePassword(user.id, hash, (err) => {
      userModel.updateStatus(email, 'active', (err) => {
      if (err) return res.status(500).json({ error: err });

      return res.status(200).json({ message: 'Password updated successfully' });
      });
    });
  });
}
