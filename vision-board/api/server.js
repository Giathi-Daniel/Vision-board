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

// Category model
const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true}
})

const Category = mongoose.model('Category', CategorySchema)

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


// Category creation
app.post('/api/categories', async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        await newCategory.save()
        res.json(newCategory)
    } catch (err) {
        res.status(400).json({ error: err.message})
    }
})

app.get('/api/categories', async (req, res) => {
    const categories = await Category.find()
    res.json(categories)
})

app.put('/api/categories/:id', async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedCategory)
})

app.delete('/api/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.json({message: 'Category deleted'})
})

// update a goal to assign it to a category
app.put('/api/goals/:id', async (req, res) => {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedGoal)
})




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})