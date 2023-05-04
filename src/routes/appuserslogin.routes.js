const express = require('express');
const router = express.Router();
const appusersController = require('../controllers/appuserslogin.controllers');

router.post('/applogin', appusersController.appuserslogin);

module.exports = router;
