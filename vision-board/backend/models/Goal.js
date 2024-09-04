const mongoose = require('mongoose')

const subgoalSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    completed: {type: Boolean, default: false},
    progress: {type: Number, default: 0}
})

const goalSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    reminderDate: Date,
    category: {type: String},
    completionPercentage: {type: Number, default: 0},
    subgoals: [subgoalSchema],
    createdAt: {type: Date, default: Date.now}
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal