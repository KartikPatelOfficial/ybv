const express = require('express');
const router = express.Router();

const User = require('../models/user');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// CREATE user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// UPDATE user by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
