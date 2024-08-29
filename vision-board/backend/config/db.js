const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connectDB('mongodb://localhost:3000/vision-board', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB