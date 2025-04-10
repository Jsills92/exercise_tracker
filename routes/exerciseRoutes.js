const express = require('express');
const router = express.Router();
const { getExercises, getExercisesByUser, addExercise, deleteExercise, updateExercise } = require('../controllers/exerciseController');
const { createUser } = require('../controllers/userController');
const { getAllUsers } = require('../controllers/userController');

// Get all users
router.get('/users', getAllUsers);

// Create a new user
router.post('/users', createUser);

// Get all exercises for a specific user
router.get('/users/:user_id/logs', getExercisesByUser);

router.get('/exercises', getExercises);


// Add a new exercise
router.post('/users/:user_id/exercises', addExercise); // Add an exercise for a specific user

// Delete an exercise
router.delete('/exercises/:id', deleteExercise);

// Update an exercise by ID
router.put('/exercises/:id', updateExercise);

module.exports = router;
