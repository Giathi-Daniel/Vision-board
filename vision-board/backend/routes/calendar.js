const express = require('express');
const router = express.Router();
const {getGoogleAuthURL, getGoogleTokens, createGoogleCalendarEvent} = require('../services/googleCalendar');
const Goal = require('../models/Goal');

// login
router.get('/auth/google', (req, res) => {
    const url = getGoogleAuthURL();
    res.redirect(url);
})

// handle OAuth2.o calback
router.get('/auth/google/callback', async (req, res) => {
    const {code} = req.query;
    try {
        const tokens = await getGoogleTokens(code)
        req.session.tokens = tokens;
        res.redirect('/dashboard')
    } catch (err) {
        res.status(500).json({ message: 'Error during Google authentication'});
    }
})

// sync goal with google calendar
router.post('/sync/:goalId', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.goalId);
        if(!goal) return res.status(404).json({ message: 'Goal not found' });
       
        const user = req.user;
        const event = await createGoogleCalendarEvent(goal, user);
        res.json(event)        
    } catch (err) {
        res.status(500).json({ message: 'Error syncing with Google Calendar'})
    }
})

module.exports = router;