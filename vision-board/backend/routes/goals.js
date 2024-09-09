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

router.get('/progress', async (req, res) => {
    try {
        const goals = await Goal.find()
        res.json(goals)
    } catch (error) {
        res.status(500).json({ message: 'Error'})
    }
})

router.post('/goals/:id/share/public', async (req, res) => {
    try {
      const goal = await Goal.findById(req.params.id);
      if (!goal) return res.status(404).json({ message: 'Goal not found' });
  
      goal.isPublic = true;
      goal.shareableLink = goal.generateShareableLink();
      await goal.save();
  
      res.status(200).json({ message: 'Goal made public', shareableLink: goal.shareableLink });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
});

router.post('/goals/:id/share/private', async (req, res) => {
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
  
router.get('/goals/shared/:id', async (req, res) => {
try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    if (goal.isPublic || goal.sharedWith.includes(req.user.email)) {
    return res.status(200).json(goal);
    }

    res.status(403).json({ message: 'Access denied' });
} catch (error) {
    res.status(500).json({ message: 'Server error' });
}
});

module.exports = router