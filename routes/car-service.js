const express = require('express');
const router = express.Router();

const CarService = require('../models/service');

// GET all car services
router.get('/', async (req, res) => {
    try {
        const carServices = await CarService.find();
        res.json(carServices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single car service by ID
router.get('/:id', async (req, res) => {
    try {
        const carService = await CarService.findById(req.params.id);
        if (!carService) {
            return res.status(404).json({ message: 'Car service not found' });
        }
        res.json(carService);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE car service (use authentication)
router.post('/', async (req, res) => {
    try {
        const newCarService = new CarService(req.body);
        const savedCarService = await newCarService.save();
        res.status(201).json(savedCarService);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// UPDATE car service by ID (use authentication)
router.put('/:id',  async (req, res) => {
    try {
        const updatedCarService = await CarService.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCarService) {
            return res.status(404).json({ message: 'Car service not found' });
        }
        res.json(updatedCarService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE car service by ID (use authentication)
router.delete('/:id',  async (req, res) => {
    try {
        const deletedCarService = await CarService.findByIdAndDelete(req.params.id);
        if (!deletedCarService) {
            return res.status(404).json({ message: 'Car service not found' });
        }
        res.json({ message: 'Car service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

