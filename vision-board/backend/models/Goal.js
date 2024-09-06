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
    sharedWith: { type: [String], default: [] },
    isPublic: { type: Boolean, default: false },
    shareableLink: { type: String }, 
    createdAt: { type: Date, default: Date.now }
})

goalSchema.methods.generateShareableLink = function () {
    const baseUrl = 'https://vision-board.vercel/share/';
    const link = baseUrl + this._id;
    return link;
}

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal