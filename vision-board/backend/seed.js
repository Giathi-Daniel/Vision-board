const mongoose = require('mongoose')
const GoalTemplate = require('./models/GoalTemplate')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const templates = [
    {
        title: 'Learn a New Language',
        description: 'Set milestones to master a new language',
        category: 'Education',
        defaultSubgoals: [
            {title: 'Learn Basic Phrases', description: 'Start with common phrases and greetings.'},
            {title: 'Practice Daily', description: 'Use apps or videos to practice daily.'},
            {title: 'Join a Conversation Group', description: 'Engage with native speakers.'},
        ],
    },
    {
        title: 'Run a Marathon',
        description: 'Prepare and train to run a full marathon.',
        category: 'Fitness',
        defaultSubgoals: [
            {title: 'Start Running', description: 'Begin with short-distance runs.'},
            {title: 'Increase Distance Weekly', description: 'Gradually increase your distance.'},
            {title: 'Build Endurance', description: 'Focus on stamina and recovery.'},
        ],
    },
];

GoalTemplate.insertMany(templates)
    .then(() => {
        console.log('Goal templates added');
        mongoose.connection.close()
    })
    .catch((err) => {
        console.error('Error inserting goal templates', err)
        mongoose.connection.close()
    })