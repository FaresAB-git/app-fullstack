const { Schema, model } = require('mongoose')
const { User } = require('user')


const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    dateCreation: {
        type: Date,
        required: true
    },
    owner: {
        type: User,
        required: true
    }
})