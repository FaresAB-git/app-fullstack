const { Schema, model } = require('mongoose')
const { User } = require('./User')
const { Project } = require('./Project')

const ProjectUserSchema = new Schema({
    Project: {
        type: Schema.Types.ObjectId,
        ref: 'Project', 
        required: true
    },    
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
})



const ProjectUser = model('projectUser', ProjectUserSchema)

module.exports = {ProjectUser}