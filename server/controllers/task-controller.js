const {Task} = require('../models/Task');

// Get task by Project ID
const getAllTasksByProjectId = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllTasksByProjectIdAndUserId = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId, author: req.params.userId });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Create a new task
const createTask = async (req, res) => {
    //Check if the project already exists (same title and project)
    const project = await Task.findOne({ title: req.body.title, project: req.body.project });
    if (project) {
        return res.status(400).send({ error: 'Task already exists' });
    }
    try {
        if (!req.body.dateCreation) {
            req.body.dateCreation = new Date();
        }
        const task = new Task(req.body);
        task.status= 'taskRequested'
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'editer', 'dateModification'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).send(error);
        }
        if (!req.body.editer) {
            return res.status(400).send({ error: 'Editer not found' });
        }
        //Search if the editer exists
        let user;
        if(req.body.editer){
            user = await User.findById(req.body.editer);
            if (!user) {
                return res.status(404).send({ error: 'Editer not found' });
            }
            task[editer] = user;
        }
        req.body.dateModification = new Date();

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTasksByProjectId,
    getTaskById,
    getAllTasksByProjectIdAndUserId
};