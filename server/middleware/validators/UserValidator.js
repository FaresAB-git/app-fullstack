const Joi = require('joi')
const User = require('../../models/User')


const validateRegisterMiddleware = (req, res, next) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


const validateLoginMiddleware = (req, res, next) => {
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Joi validation for user registration
const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(user)
}

// Joi validation for user login
const validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(user)
}

module.exports = { validateRegisterMiddleware, validateLoginMiddleware }