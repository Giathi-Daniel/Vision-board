const express = require('express')
const connectDB = express('./config/db')
const authRoutes = express('./config/db')
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const Goal = require('./models/Goal')


const app = express()


connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// MODEL
// const GoalSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     progress: Number,
//     category: String,
// })

// const Goal = mongoose.model('Goal', GoalSchema)

// // Category model
// const CategorySchema = new mongoose.Schema({
//     name: {type: String, required: true, unique: true}
// })

// const Category = mongoose.model('Category', CategorySchema)







// ROUTES
// app.get('/api/goals', async (req, res) => {
//     const goals = await Goal.find()
//     res.json(goals)
// })

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

// app.get('/api/categories', async (req, res) => {
//     const categories = await Category.find()
//     res.json(categories)
// })

// app.put('/api/categories/:id', async (req, res) => {
//     const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     res.json(updatedCategory)
// })

// app.delete('/api/categories/:id', async (req, res) => {
//     await Category.findByIdAndDelete(req.params.id)
//     res.json({message: 'Category deleted'})
// })

// // update a goal to assign it to a category
// app.put('/api/goals/:id', async (req, res) => {
//     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     res.json(updatedGoal)
// })


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'giathidaniel252@gmail.com',
        pass: 'your-email-password'
    }
})

cron.schedule('0 8 * * *', async () => {
    const goals = await Goal.find({reminderDate: {$lte: new Date()}})
    goals.forEach((goal) => {
        transporter.sendMail({
            from: 'giathidaniel252@gmail.com',
            to: goal.userEmail,
            subject: `Reminder: ${goal.title}`,
            text: `This is a reminder for your goal: ${goal.title}\n\nDescription: ${goal.description}`
        })
    })
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



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})