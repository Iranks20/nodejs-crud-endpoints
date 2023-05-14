const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const pool = require('../../config/db.config');
const userModel = require('../models/appuserslogin.model');
const keys = require('../../config/key.config');
const mailer = require('../../config/mailer');


// login
exports.appuserslogin = function(req, res) {
    const { email, password, sex} = req.body;
    try {
        userModel.getUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error111111' });
        }
    
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        console.log(user)
    
        // if (user.Status !== 'active') {
        //     return res.status(400).json({ error: 'Invalidd request' });
        // }
    
        // bcrypt.compare(password, user.password, (err, result) => {
        //     if (err) {
        //     return res.status(500).json({ error: 'Internal server error' });
        //     }
    
        //     if (!result) {
        //     return res.status(401).json({ error: 'Invalid credentials' });
        //     }
    
        //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        //     return res.json({ token });
        // });
        message = 'successful login'
        error = false
        userId = user.id
        // status = ''
        const token = jwt.sign({ userId: user.id, userPassword: user.email }, keys.JWT_SECRET);
            return res.json({ token, email, message, error, userId });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

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
  