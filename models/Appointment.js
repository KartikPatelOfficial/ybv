const mongoose = require('mongoose');

const damagePhotoSchema = require('./DamagePhoto').DamagePhoto.schema;

// AppointmentStatus Enum
const AppointmentStatus = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELED: 'canceled'
};

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    carServiceId: { type: String, required: true },
    dateTime: { type: Date, required: true },
    notes: { type: String },
    damagePhotos: { type: [damagePhotoSchema], default: [] },
    status: {
        type: String,
        enum: Object.values(AppointmentStatus), // Allow values based on the enum
        default: AppointmentStatus.PENDING
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { Appointment };
