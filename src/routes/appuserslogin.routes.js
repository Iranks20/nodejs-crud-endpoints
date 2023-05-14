const express = require('express');
const router = express.Router();
const appusersController = require('../controllers/appuserslogin.controllers');

router.post('/applogin', appusersController.appuserslogin);
router.post('/forgot-password', appusersController.sendOtp);
router.post('/verify-otp', appusersController.verifyOtp);
router.post('/change-password', appusersController.updatePassword);


module.exports = router;
