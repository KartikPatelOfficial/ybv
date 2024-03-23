const express = require('express');
const router = express.Router();

const { Appointment } = require('../models/Appointment');
const  {User}  = require('../models/User.js');

// GET all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find()
        .populate('carServiceId')
        .exec();

        await Promise.all(appointments.map(async appointment => {
            let user = await User.find({ id: appointment.userId })
            appointment.user = user;
            return appointment;
        }));

        res.json(appointments);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get appointments by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.params.userId })
        .populate('carServiceId')
        .populate('userId', 'name email phone')
        .exec();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE appointment
router.post('/', async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// UPDATE appointment by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(updatedAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// DELETE appointment by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;