const Joi = require('joi');
const Task = require('../../models/Task');

const TaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    dateCreation: Joi.date().optional(),
    author: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    editer: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
    dateModification: Joi.date().optional(),
    project: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
    status: Joi.string().optional()
});

const validateTask = (req, res, next) => {
    const { error } = TaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateTaskId = (req, res, next) => {
    const { taskId } = req.params;
    if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }
    next();
};

module.exports = {
    validateTask,
    validateTaskId
};