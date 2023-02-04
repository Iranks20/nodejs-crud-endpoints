const express = require('express')
const router = express.Router()
const incidenceController =   require('../controllers/incidence.controller');
// Retrieve all incidences
router.get('/', incidenceController.findAll);
// Create a new incidence
router.post('/', incidenceController.create);
// Retrieve a single incidence with id
router.get('/:id', incidenceController.findById);
// Update a incidence with id
router.put('/:id', incidenceController.update);
// Delete a incidence with id
router.delete('/:id', incidenceController.delete);
module.exports = router