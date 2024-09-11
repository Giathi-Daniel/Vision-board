const express = require('express')
const connectDB = express('./config/db')
const authRoutes = express('./routes/auth')
const goalRoutes = express('./routes/goals')
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const Goal = require('./models/Goal')
const Category = require('./models/Category');
require('dotenv').config()

const app = express()


connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

cron.schedule('0 8 * * *', async () => {
    try {
        const goals = await Goal.find({reminderDate: {$lte: new Date() }})
        goals.forEach((goal) => {
            transporter.sendEmail({
                from: process.env.EMAIL_USER,
                to: goal.userEmail,
                subject: `Reminder: ${goal.title}`,
                text: `This is a reminder for your goal: ${goal.title}\n\nDescription: ${goal.description}`
            }, (err, info) => {
                if(err) {
                    console.error(`Error sending reminder for goal: ${goal.title}`, err)
                } else {
                    console.log(`Reminder sent for goal: ${goal.title}`)
                }
            })
        })
    } catch (error) {
        console.error('Error sending reminder email:', error)
    }
})

app.post('/api/categories', async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        await newCategory.save()
        res.json(newCategory)
    } catch (err) {
        res.status(400).json({ error: err.message})
    }
})

app.put('/api/goals/:id/completion', async (req, res) => {
    const { id } = req.params;
    const { completionPercentage } = req.body;
    
    try {
      const goal = await Goal.findById(id);
      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }
  
      goal.completionPercentage = completionPercentage;
      await goal.save();
  
      res.status(200).json(goal);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });