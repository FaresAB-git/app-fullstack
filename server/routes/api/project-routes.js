const express = require('express');
const projectController = require('../../controllers/project-controller');
const { validateProject, validateProjectId } = require('../../middleware/validators/project-validator');
const { Project } = require('../../models/Project');

const router = express.Router();

// Route GET /api/projects
router.get('/', projectController.getAllProjects);

// Route GET /api/projects/:id
router.get('/:id',validateProjectId, projectController.getProjectById);

// Route POST /api/projects
router.post('/', validateProject, projectController.createProject);

// Route PUT /api/projects/:id
router.put('/:id',validateProjectId, projectController.updateProject);

// Route DELETE /api/projects/:id
router.delete('/:id',validateProjectId, projectController.deleteProject);

module.exports = router;