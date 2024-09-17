const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

router.post('/', async (req, res) => {
    try {
        const newGoal = new Goal(req.body);
        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ message: 'Error creating goal', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching goals', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching goal', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGoal) return res.status(404).json({ message: 'Goal not found' });
        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: 'Error updating goal', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
        if (!deletedGoal) return res.status(404).json({ message: 'Goal not found' });
        res.status(200).json({ message: 'Goal deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting goal', error });
    }
});

router.post('/:goalId/subgoals', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });

        const subgoal = {
            title: req.body.title,
            description: req.body.description || ''
        };

        goal.subgoals.push(subgoal);
        await goal.save();

        res.status(201).json(goal);
    } catch (err) {
        res.status(500).json({ message: 'Error adding subgoal', err });
    }
});

router.put('/:goalId/subgoals/:subgoalId', async(req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        if (!goal) return res.status(400).json({ message: 'Goal not found' });

        const subgoal = goal.subgoals.id(req.params.subgoalId);
        subgoal.completed = req.body.completed;

        await goal.save();
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subgoal', error });
    }
});

router.delete('/:goalId/subgoals/:subgoalId', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        if (!goal) return res.status(400).json({ message: 'Goal not found' });

        goal.subgoals.id(req.params.subgoalId).remove();
        await goal.save();

        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subgoal', error });
    }
});

router.post('/:id/share/public', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });

        goal.isPublic = true;
        await goal.save();

        res.status(200).json({ message: 'Goal made public', shareableLink: goal.shareableLink });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/:id/share/private', async (req, res) => {
    const { sharedWith } = req.body;

    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });

        goal.sharedWith.push(...sharedWith);
        await goal.save();

        res.status(200).json({ message: 'Goal shared privately' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/search', async (req, res) => {
    const {query, category, completed} = req.query;

    try {
        const searchCriteria = {};
        if(query){
            searchCriteria.$or = [
                // case sensitive search
                {title: { $regex: query, $options: 'i'}},
                {description: {$regex: query, $options: 'i'}}
            ]
        }

        if(category) {
            searchCriteria.category = category;
        }

        if(completed) {
            searchCriteria.completed = completed === 'true'
        }

        const goals = await Goal.find(searchCriteria)
        res.json(goals)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching goals', error})
    }
})

module.exports = router;
