const express = require('express')
const router = express.Router()
const reporterController =   require('../controllers/reporter.controller');
// Retrieve all reporters
 router.get('/', reporterController.findAll);
//  daily reporterz
router.get('/daily', reporterController.dailyReporterz);
// weekly reporterz
router.get('/weekly', reporterController.weeklyReporterz);
// monthly reporterz
router.get('/monthly', reporterController.monthlyReporterz);
// // Create a new reporter
 router.post('/', reporterController.create);

// // Retrieve a single reporter with id
 router.get('/:id', reporterController.findById);
// // Update a reporter with id
 router.put('/:id', reporterController.update);
// // Delete a reporter with id
 router.delete('/:id', reporterController.delete);
 module.exports = router