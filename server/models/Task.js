const { Schema, model } = require('mongoose')
const { User } = require('./User')
const { Project } = require('./Project')

const TaskSchema = new Schema({
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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    editer: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: false
    },
    dateModification:  {
        type: Date,
        required: false
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project', 
        required: false
    }
})