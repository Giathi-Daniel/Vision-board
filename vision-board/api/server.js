const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000;

mongoose.connect('connectionstring', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongooseDB Connected'))
.catch(err => console.log(err))

// MODEL
const GoalSchema = new mongoose.Schema({
    title: String,
    description: String,
    progress: Number,
    category: String,
})

const Goal = mongoose.model('Goal', GoalSchema)

// ROUTES
app.get('/api/goals', async (req, res) => {
    const goals = await Goal.find()
    res.json(goals)
})

app.post('/api/goals', async (req, res) => {
    const newGoal = new Goal(req.body)
    await newGoal.save()
    res.json(newGoal)
})

app.put('/api/goals/:id', async (req, res) => {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedGoal)
})

app.delete('/api/goals/:id', async (req, res) => {
    await Goal.findByIdAndDelete(req.params.id)
    res.json({message: 'Goal deleted'})
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})