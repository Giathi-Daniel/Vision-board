const express = require('express');
const router = express.Router();
const GoalTemplate = require('../models/GoalTemplate');
const Goal = require('../models/Goal');

router.get('/', async (req, res) => {
    try {
        const templates = await GoalTemplate.find()
        res.json(templates)
    } catch (error) {
        res.status(500).json({message: 'Error fetching templates'})
    }
})

router.post('/:templateId/clone', async (req, res) => {
    try {
        const template = await GoalTemplate.findById(req.params.templateId);
        if (!template) return res.status(404).json({message: 'Template not found'});

        const clonedGoal = new Goal({
            title: template.title,
            description: template.description,
            category: template.category,
            subgoals: template.defaultSubgoals,
            userEmail: req.body.userEmail
        });

        await clonedGoal.save();
        res.status(201).json(clonedGoal)
    } catch(err){
        res.status(500).json({ message: 'Error cloning template'})
    }
})

module.exports = router;