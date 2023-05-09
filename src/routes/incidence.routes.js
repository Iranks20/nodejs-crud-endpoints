const express = require('express')
const router = express.Router()
const incidenceController =   require('../controllers/incidence.controller');
// Retrieve all incidences
router.get('/', incidenceController.findAll);
// count of all incidences
router.get('/countall', incidenceController.findAllCounts);

// retrieve daily incidence
router.get('/daily', incidenceController.dailyIncident);
// daily incident counts
router.get('/dailycounts', incidenceController.dailyIncidentCounts);


// retrieve weekly incidence
router.get('/weekly', incidenceController.weeklyIncident);
// weekly incident counts
router.get('/weeklycounts', incidenceController.weeklyIncidentCounts);

// retrieve monthly incidence
router.get('/monthly', incidenceController.monthlyIncident);
// monthly incident counts
router.get('/monthlycounts', incidenceController.monthlyIncidentCounts);


// Create a new incidence
router.post('/', incidenceController.create);
// Retrieve a single incidence with id
router.get('/:id', incidenceController.findById);
// Update a incidence with id
router.put('/:id', incidenceController.update);
// Delete a incidence with id
router.delete('/:id', incidenceController.delete);
// updateById
// retriev incidennces usig reporter id
router.get('/new/:reporterId', incidenceController.findByReporterId);

router.put('/status/:id', incidenceController.updateById);
module.exports = router