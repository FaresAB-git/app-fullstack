const { Schema, model } = require('mongoose')
const { User } = require('user')
const { Project } = require('project')

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
    author:       {
        type: User,
        required: true
    },
    editer:    {
        type: User,
        required: false
    },
    dateModification:  {
        type: Date,
        required: false
    },
    project:  {
        type: Project,
        required: true
    }
})