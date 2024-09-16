const mongoose = require('mongoose')

const GoalTemplateSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    category: String,
    defaultDuration: {type: Number},
})

module.exports = mongoose.model('GoalTemplate', GoalTemplateSchema)