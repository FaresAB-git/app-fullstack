const { Schema, model } = require('mongoose')
const { User } = require('user')
const { Project } = require('project')

const ProjectUserSchema = new Schema({
    Project: {
        type: String,
        required: true
    },
    User: {
        type: String,
        required: true
    }
})