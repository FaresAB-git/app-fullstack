const Joi = require('joi')
const User = require('../../models/User')

// Joi validation for user registration
const userSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
})

const validateRegisterMiddleware = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};



// Joi validation for user login
const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
})

const validateLoginMiddleware = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


const validateUserId = (req, res, next) => {
    const { UserId } = req.params;
    if (!UserId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    if (!UserId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }
    next();
}

module.exports = { validateRegisterMiddleware, validateLoginMiddleware, validateUserId }