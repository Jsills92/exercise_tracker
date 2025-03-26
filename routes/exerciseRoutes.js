const express = require('express');
const router = express.Router();
const { getExercises, addExercise } = require('../controllers/exerciseController');

// Get all exercises
router.get('/exercises', getExercises);

// Add a new exercise
router.post('/exercises', addExercise);

module.exports = router;