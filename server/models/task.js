const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  task: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Task', taskSchema)
