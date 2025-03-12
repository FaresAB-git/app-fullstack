const { Schema, model } = require('mongoose')
const { User } = require('./User')
const { Project } = require('./Project')

const ProjectUserSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project', 
        required: true
    },    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
})



const ProjectUser = model('projectUser', ProjectUserSchema)

module.exports = {ProjectUser}
