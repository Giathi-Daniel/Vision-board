const mongoose = require('mongoose')

const subgoalSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    completed: {type: Boolean, default: false},
    progress: {type: Number, default: 0, min: 0, max: 100}
})

const goalSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    reminderDate: {type: Date, default: null},
    category: {type: String, default: 'General'},
    completionPercentage: {type: Number, default: 0, min: 0, max: 100},
    subgoals: [subgoalSchema],
    sharedWith: { type: [String], default: [] },
    isPublic: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

goalSchema.virtual('sharebleLink').get(function() {
    return `https:vision-board.vercel.app/share/${this._id}`;
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal