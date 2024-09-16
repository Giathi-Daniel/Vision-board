const {google} = require('googleapis')
const {OAuth2} = google.auth;
require('dotenv').config();

const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
)

// redirect users for authentication
const getGoogleAuthURL = () => {
    const scopes = [
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/calendar'
    ]

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    })
}

// tokenization
const getGoogleTokens = async (code) => {
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens)
    return tokens
}

// create calendar
const createGoogleCalendarEvent = async (goal, user) => {
    const calendar = google.calendar({version: 'v3', auth: oauth2Client})

    const event = {
        summary: goal.title,
        description: goal.description,
        start: {
            dateTime: goal.startDate,
            timeZone: 'Africa/Kenya'
        },
        end: {
            dateTime: goal.endDate,
            timeZone: 'Africa/Kenya'
        },
        attendees: [{email: user.email}],
    }

    const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
    })

    return response.data
};

module.exports = {getGoogleAuthURL, getGoogleTokens, createGoogleCalendarEvent};