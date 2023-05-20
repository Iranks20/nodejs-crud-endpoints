const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const pool = require('../../config/db.config');
const userModel = require('../models/appuserslogin.model');
const keys = require('../../config/key.config');
const mailer = require('../../config/mailer');


// login

  exports.appuserslogin = function(req, res) {
    const { email, password } = req.body;
    console.log(password);
    try {
      userModel.getUserByEmail(email, (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if user status is active
        if (user.Status !== 'Active') {
          return res.status(401).json({ error: 'Account is not Active' });
        }

        // Encrypt the password entered by the user
        bcrypt.compare(password, user.password, (compareErr, isMatch) => {
          if (compareErr) {
            return res.status(500).json({ error: 'Internal server error' });
          }

          if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
          }

          // Update the login time for the user
          userModel.updateLoginTime(user.id, (updateErr) => {
            if (updateErr) {
              return res.status(500).json({ error: 'Internal server error' });
            }

            const token = jwt.sign({ userId: user.id, userPassword: user.email }, keys.JWT_SECRET);
            return res.json({ token, email, message: 'Successful login', error: false, userId: user.id });
          });
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// function for sending otp
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
          return res.status(400).json({ error: 'Invaliiid request' });
        }
  
        if (user.otp !== otp) {
          return res.status(400).json({ error: 'Invalid OTP' });
        }
  
        userModel.updateStatus(email, 'waiting', (err) => {
       
          if (err) return res.status(500).json({ error: err });
          return res.status(200).json({ message: 'OTP verified continue', status: 200 });
        });
      });
  }
  
  // update password
  exports.updatePassword = function(req, res) {
    const { email, password } = req.body;

    userModel.getByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ error: err });

      if (user.Status !== 'waiting') {
        return res.status(400).json({ error: 'Invalid request' });
      }

      // Encrypt the new password
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        userModel.updatePassword(user.id, hashedPassword, (updateErr) => {
          if (updateErr) return res.status(500).json({ error: updateErr });

          userModel.updateStatus(email, 'Active', (statusErr) => {
            if (statusErr) return res.status(500).json({ error: statusErr });

            return res.status(200).json({ message: 'Password updated successfully', status: 200 });
          });
        });
      });
    });
  };

  