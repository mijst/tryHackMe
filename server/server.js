require('dotenv').config();

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())

mongoose.connect(process.env.MONGODB_API)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected'))

app.use(express.json())


const tasksRouter = require('./routes/tasks')
app.use('/tasks', tasksRouter)

app.listen(3000, () => console.log('Server Started'))
