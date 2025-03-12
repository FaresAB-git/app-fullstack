const { Schema, model } = require('mongoose')
const { User } = require('./User')
const { Project } = require('./Project')

const ChatMessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: Project,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const ChatMessage = model('chatMessage', ChatMessageSchema)


module.exports = {ChatMessage};
