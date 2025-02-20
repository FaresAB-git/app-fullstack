const express = require('express');
const TaskController = require('../../controllers/task-controller');
const auth = require('../../middleware/auth-middleware');

const router = express.Router();

// Get all tasks by Project id
router.get('/project/:projectId',auth, TaskController.getAllTasksByProjectId);

// Get a single task by ID
router.get('/:id',auth, TaskController.getTaskById);

// Create a new task
router.post('/',auth, TaskController.createTask);

// Update a task by ID
router.put('/:id',auth, TaskController.updateTask);

// Delete a task by ID
router.delete('/:id',auth, TaskController.deleteTask);

module.exports = router;