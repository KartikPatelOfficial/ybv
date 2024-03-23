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
    userId: { type: String, required: true },
    carServiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'CarService', required: true },
    dateTime: { type: Date, required: true },
    notes: { type: String },
    damagePhotos: { type: [damagePhotoSchema], default: [] },
    status: {
        type: String,
        enum: Object.values(AppointmentStatus), // Allow values based on the enum
        default: AppointmentStatus.PENDING
    }
},
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { Appointment };
