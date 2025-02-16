const { Schema, model } = require('mongoose')
const { User } = require('./User')


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
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
})

const Project = model('project', ProjectSchema)

module.exports = {Project}