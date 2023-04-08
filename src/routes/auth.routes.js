const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.contollers');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/update-password', authController.updatePassword);

module.exports = router;
