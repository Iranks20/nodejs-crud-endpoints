const express = require('express')
const router = express.Router()
const reporterController =   require('../controllers/reporter.controller');
// Retrieve all reporters
router.get('/', reporterController.findAll);
// count all 
router.get('/allreporters', reporterController.countAllReporters);

//  daily reporterz
router.get('/daily', reporterController.dailyReporterz);
// count daily reporters
router.get('/dailycounts', reporterController.countDailyReporters);

// weekly reporterz
router.get('/weekly', reporterController.weeklyReporterz);
// counting weekly reporters
router.get('/weeklycounts', reporterController.countWeeklyReporters);


// monthly reporterz
router.get('/monthly', reporterController.monthlyReporterz);
// counting monthly reporters
router.get('/monthlycounts', reporterController.countMonthlyReporters);

// // Create a new reporter
 router.post('/', reporterController.create);

// // Retrieve a single reporter with id
 router.get('/:id', reporterController.findById);
// // Update a reporter with id
 router.put('/:id', reporterController.update);
// // Delete a reporter with id
 router.delete('/:id', reporterController.delete);
 // updateById
router.put('/status/:id', reporterController.updateById);
 module.exports = router