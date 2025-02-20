const express = require('express');
const projectController = require('../../controllers/project-controller');
const { validateProject, validateProjectId } = require('../../middleware/validators/project-validator');
const { validateUserId } = require('../../middleware/validators/user-validator');
const { Project } = require('../../models/Project');
const auth = require('../../middleware/auth-middleware');

const router = express.Router();

// Route GET /api/projects
router.get('/',auth, projectController.getAllProjects);

// Route GET /api/projects/user/UserID
router.get('/user/:UserId', auth, validateUserId, projectController.getProjectsByUserId);

// Route GET /api/projects/:id
router.get('/:id',auth,validateProjectId, projectController.getProjectById);

// Route POST /api/projects
router.post('/', auth,validateProject, projectController.createProject);

// Route PUT /api/projects/:id
router.put('/:id',auth,validateProjectId, projectController.updateProject);

// Route DELETE /api/projects/:id
router.delete('/:id',auth,validateProjectId, projectController.deleteProject);

module.exports = router;