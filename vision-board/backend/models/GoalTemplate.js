const mongoose = require('mongoose')

const GoalTemplateSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    category: String,
    defaultSubgoals: [{title: String, description: String}],
})

const GoalTemplate = mongoose.model('GoalTemplate', GoalTemplateSchema)

module.exports = GoalTemplate;