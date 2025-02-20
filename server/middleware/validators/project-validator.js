const Joi = require('joi');
const { Project } = require('../../models/Project');

const projectSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(255).optional(),
    owner: Joi.string().required()
});

const validateProject = (req, res, next) => {
    const { error } = projectSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateProjectId = (req, res, next) => {
    const { projectId } = req.params;
    if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid project ID" });
    }
    next();
};

module.exports = {
    validateProject,
    validateProjectId
};