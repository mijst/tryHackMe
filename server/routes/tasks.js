const express = require('express')
const router = express.Router()
const Task = require('../models/task')
//get all
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json(tasks)
  } catch {
    res.status(500).json({ message: err.message })
  }
})
//create one
router.post('/', async (req, res) => {
  const task = new Task({
    name: req.body.name,
    task: req.body.task
  })
  try {
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//update one
router.put('/:id', getTask, async (req, res) => {
  if (req.body.task != null) {
    res.task.task = req.body.task
  }
  try {
    const updatedTask = await res.task.save()
    res.json(updatedTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//delete one
router.delete('/:id', getTask, async (req, res) => {
  try {
    await res.task.deleteOne()
    res.json({ message: 'Deleted Task' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTask(req, res, next) {
  let task
  try {
    task = await Task.findById(req.params.id)
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.task = task
  next()
}

module.exports = router
