const mongoose = require('mongoose')

const subgoalSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    completed: {type: Boolean, default: false}
})

const goalSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    category: {type: String},
    subgoals: [subgoalSchema]
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal