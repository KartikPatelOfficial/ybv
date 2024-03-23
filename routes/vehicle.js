const express = require('express');
const router = express.Router();

const Vehicle = require('../models/Vehicle.js');

// GET all vehicles by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ userId: req.params.userId });
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single vehicle by ID
router.get('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE vehicle
router.post('/', async (req, res) => {
    try {
        const newVehicle = new Vehicle(req.body);
        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE vehicle by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(updatedVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE vehicle by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;