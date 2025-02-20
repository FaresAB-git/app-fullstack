const express = require('express');
const TaskController = require('../../controllers/task-controller');
const auth = require('../../middleware/auth-middleware');
const { validateProjectId,validateProject  } = require('../../middleware/validators/project-validator');
const { validateTaskId, validateTask } = require('../../middleware/validators/task-validator');
const { validateUserId } = require('../../middleware/validators/user-validator');
const router = express.Router();



// Get all tasks (for a project)
router.get('/project/:projectId',auth, validateProjectId, TaskController.getAllTasksByProjectId);

// Get all tasks (for a projct) of a user
router.get('/project/:projectId/user/:userId',auth, validateProjectId, validateUserId, TaskController.getAllTasksByProjectIdAndUserId);

// Get a single task by ID
router.get('/:taskId',auth,validateTaskId, TaskController.getTaskById);

// Create a new task
router.post('/',auth,validateTask, TaskController.createTask);

// Update a task by ID
router.put('/:taskId',auth,validateTaskId, TaskController.updateTask);

// Delete a task by ID
router.delete('/:taskId',auth,validateTaskId, TaskController.deleteTask);

module.exports = router;