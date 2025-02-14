const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description, user_id: req.user.id });
    await task.save();
    res.json(task);
});

// Read Tasks
router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ user_id: req.user.id });
    res.json(tasks);
});

// Update Task
router.put('/:id', auth, async (req, res) => {
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, status }, { new: true });
    res.json(task);
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
