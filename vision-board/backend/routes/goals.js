const express = require('express')
const router = express.Router()
const Goal = require('../models/Goal')

router.post('/:goalId/subgoals', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId)
        const subgoal = {
            title: req.body.title,
            description: req.body.description,
        }
        goal.subgoals.push(subgoal)
        await goal.save()
        res.status(201).json(goal)
    } catch (err) {
        res.status(500).json({message: "Error adding subgoal", err})
    }
})

router.put('/:goalId/subgoals/:subgoalId', async(req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId)
        const subgoal = goal.subgoals.id(req.params.subgoalId)
        subgoal.completed = req.body.completed
        await goal.save()
        res.status(200).json(goal)
    } catch (error) {
        res.status(500).json({ message: 'Error updating subgoal', error})
    }
})

router.delete('/:goalId/subgoals/:subgoalId', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId)
        goal.subgoals.id(req.params.subgoalId).remove()
        await goal.save()
        res.status(200).json(goal)
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subgoal', error })
    }
})

module.exports = router