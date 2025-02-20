const { date } = require('joi');
const {Project} = require('../models/Project');
const { User } = require('../models/User');
const { get } = require('mongoose');

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all projects by user ID
const getProjectsByUserId = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.params.UserId });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Create a new project
const createProject = async (req, res) => {
    const { title, description, owner } = req.body;
    const user = await User.findById(owner);
    if (!user) {
        return res.status(404).json({ message: 'Owner not found' });
    }

    const project = new Project({
        title,
        description,
        dateCreation: new Date(),
        owner
    });

    try {
        const newProject = await project.save();
        return res.status(201).json(newProject);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Update an existing project
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.name = req.body.name || project.name;
        project.description = req.body.description || project.description;
        project.status = req.body.status || project.status;

        const updatedProject = await project.save();
        return res.status(200).json(updatedProject);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.remove();
        return res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProjects,
    getProjectsByUserId,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};