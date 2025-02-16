const { Schema, model } = require('mongoose')
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now 
    }
})

UserSchema.methods.generateJwt = function() {
    return jwt.sign(
        { email: this.email, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
}



const User = model('user', UserSchema)

module.exports = {User}