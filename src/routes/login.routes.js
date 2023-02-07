const express = require('express')
const router = express.Router()
const loginController =   require('../controllers/login.controller');
// Retrieve all logins
router.get('/:id', loginController.findById);

module.exports = router